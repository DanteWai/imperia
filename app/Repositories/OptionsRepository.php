<?

namespace App\Repositories;

use App\Models\Product;
use App\Models\Product_option;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;


class OptionsRepository extends Repository {

    public function __construct(Product_option $options)
    {
        $this->model = $options;


    }




    /*Получаем конкретный продукт по id*/
    public function getProduct($id){

        $builder= $this->model->select('*')->where('option_id',$id)->with(['product'=>function($q){
            $q->select('product_id','brand_id','category_id','product_model','product_images','product_desc')->with(['brand'=>function($q){
                $q->select('brand_id','brand_name','brand_logo');
            }]);
        }]);

        return $builder->first();
    }
    /*Получаем все продукты с выбранными id*/
    public function getProducts($ids){

        $builder= $this->model->select('*')->whereIn('option_id',$ids)->with(['product'=>function($q){
            $q->select('product_id','brand_id','category_id','product_model','product_images','product_desc')->with(['brand'=>function($q){
                $q->select('brand_id','brand_name');
            }]);
        }]);

        return $builder->get()->toArray();
    }

    public function getProductsForAdmin($category_id){
        $builder= $this->model->select('*')
            ->orderBy('updated_at','desc')
            ->whereHas('Product', function ($q) use($category_id){
                $q->where('category_id',$category_id);
            });
        return $builder->get();
    }

    public function getAnalog($product,$take){

        if($product->product->category_id ===1){
            $where = [
                ['options->width',$product->options['width']],
                ['options->height',$product->options['height']],
                ['options->radius',$product->options['radius']],
                ['options->season',$product->options['season']],
                ['options->heavy',$product->options['heavy']],
            ];

        }else if(($product->product->category_id ===1)){
            $where = [
                ['options->width',$product->options['width']],
                ['options->height',$product->options['height']],
                ['options->radius',$product->options['radius']],
                ['options->season',$product->options['season']],
                ['options->heavy',$product->options['heavy']],
            ];
        }



        $builder= $this->model->select('option_id','product_id','price','options')->where($where)->with(['product'=>function($q){
            $q->select('product_id','brand_id','product_model','product_images','product_desc')->with(['brand'=>function($q){
                $q->select('brand_id','brand_name','brand_logo');
            }]);
        }]);

        return $builder->take($take)->get();

    }

    /* TODO что это всё такое*/
    public function getUniqueOption($select='*',$item,$category=1){
        $builder = $this->model->select($select)->distinct()->where($item, '>' , 0)
            ->orderBy($item)
            ->whereHas('Product', function ($q) use($category){
                $q->where('category_id',$category);
            });

        return $builder->get();
    }


    //Возвращает количество уникальных параметров для подборщика на главной странице
    public function getUniqueParam($base_option,$json_option,$params){

        $filter_base_mass = [];

        foreach ($base_option as $key=>$item) {
            if(is_array($item)) {
                $filter_base_mass[$key] = $item;
            } else{
                $filter_base[] = [$key,$item];
            }
        }

        if($json_option != false){
            $inputParam = array_merge(array_keys($base_option),array_keys($json_option));
            foreach ($json_option as $key=>$item) {
                $filter_json_mass[$key] = $item;
            }
        }else{
            $filter_json_mass='';
            $inputParam = array_keys($base_option);
        }



        $newParams=[];

        foreach ($params as $param) {
            if(!in_array($param, $inputParam)){
                if($param != 'brand_id'){

                    $builder = $this->model->select('options->'.$param.' as '.$param)->where('options->'.$param,'>',0)->distinct()->whereHas('Product', function ($q) use($filter_base, $filter_base_mass, $filter_json_mass){
                        $q->where($filter_base);

                       if(!empty($filter_base_mass)){
                            foreach($filter_base_mass as $key=>$item){
                                $q->whereIn($key,$item);
                            }
                        }
                    });
                    if(!empty($filter_json_mass)){
                        foreach($filter_json_mass as $key=>$item){
                            $builder->whereIn('options->'.$key,$item);
                        }
                    }



                    $newParams['param'][$param] = $builder->orderBy($param, 'desc')->get()->toArray();
                    $newParams['param'][$param] = array_map(function($element) use ($param){
                        return $element[$param];
                    },$newParams['param'][$param]);
                }
                else{
                    $builder = Product::select('brand_id')->where($filter_base)->distinct()->whereHas('options',function($q) use($filter_json_mass) {
                            if(!empty($filter_json_mass)){
                                foreach($filter_json_mass as $key=>$item){
                                    $q->whereIn('options->'.$key,$item);
                                }
                            }

                    })->with(['brand'=>function ($query){
                        $query->select('brand_id','brand_name');
                    }]);
                    $brands=$builder->get()->toArray();
                    $brands = array_map(function ($element){
                        return $element['brand'];
                    },$brands);
                    $newParams['param'][$param] = $brands;
                }
            }


        }



        $newParams['count'] = $this->getParamOption($base_option,$json_option,true);

        return $newParams;

    }
    //Возвращает список товаров для каталога по выбранным параметрам
    public function getParamOption($productsTable,$optionsTable,$getCount=false,$currentPage=1){

        //Условия для таблицы products
        $conditionWhereIn = [];
        $conditionWhere = [];

        foreach ($productsTable as $columnName => $columnValue) { // columnValue string or array
            is_array($columnValue) ?
                $conditionWhereIn[$columnName] = $columnValue : // если значение столбца массив, формируем для whereIn
                $conditionWhere[] = [$columnName,$columnValue];  // иначе под обычный where
        }


        $builder = $this->model->select('option_id','product_id','price','options','count') //условие на ограничение таблицы с продуктами
            ->whereHas('product', function ($q) use($conditionWhere, $conditionWhereIn){
                //Проверка и применение доп условий к таблице products
                if(!empty($conditionWhere)) $q->where($conditionWhere);
                if(!empty($conditionWhereIn)){
                    foreach($conditionWhereIn as $columnName=>$columnValue){ //$columnValue is array
                        $q->whereIn($columnName,$columnValue);
                    }
                }
        });



        if(isset($optionsTable['price'])){
            //если передана цена и это массив то смотрим в диапазоне иначе равное значение
            is_array($optionsTable['price']) ? $builder->whereBetween('price', $optionsTable['price']) : $builder->where('price',$optionsTable['price']);
        }


        //Добавление json условий
        if($optionsTable['options'] && !empty($optionsTable['options'])){
            foreach($optionsTable['options'] as $columnName=>$columnValue){
                $builder->whereIn('options->'.$columnName,$columnValue);
            }
        }

        if($getCount){  return $builder->count(); }

        //Подцепление таблицы продуктов к таблице опции, и подключение таблицы брендов к таблице продуктов
         $builder->with(['product'=>function($q){
             $q->select('product_id','brand_id','category_id','product_model','product_images')->with(['brand'=>function($q){
                $q->select('brand_id','brand_name','brand_logo');
            }]);;
         }]);


        Paginator::currentPageResolver(function () use ($currentPage) { return $currentPage; });

        return $builder->paginate(10);
    }

    public function one($aliasName,$alias, $attr = array()){
        $product = parent::one($aliasName,$alias,$attr);

        return $product;
    }




    public function addOption($data) {
        foreach ($data as $name=>$element){

            if(stripos($name,'json_') === 0){
                $name = str_replace('json_','', $name);
                $json_options[$name] = $element;
                unset($data['json_'.$name]);
            }
        }
        $data['options'] =  $json_options;
        if(!isset($data['count'])) $data['count'] = 1;

        $data['price_lists'] = [
            $data['price_id'] => [
                'count'=> 1
            ]
        ];
        unset($data['price_id']);

        if($this->one('full_name_alias',$data['full_name_alias'])){
            /*$request->merge(['product_model' => $data['product_model']]);
            $request->flash();*/

            return ['error' => 'Данный псевдоним в опциях уже используется'];
        }

        $this->model->fill($data);
        if($this->model->save()){
            return ['error' => 'Добавление успешно'];
        }
        return ['error' => 'Не удалось произвести сохранение'];

    }

}
