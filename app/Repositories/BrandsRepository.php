<?

namespace App\Repositories;

use App\Models\Product_brand;
use Carbon\Carbon;
use Debugbar;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Str;
use Image;
use Config;

class BrandsRepository extends Repository {

    public function __construct(Product_brand $brand)
    {
        $this->model = $brand;
    }

    public function getBrands($select, $category=1) {


        $builder = $this->model->select($select)->distinct()
            ->orderBy('brand_name')
            ->whereHas('categories', function ($q) use ($category) {
                $q->select('*')->where('product_categories.category_id',$category);
            });

        return $builder->get();
    }

    public function getBrandsForSort($sortName,$sort){
        $builder = $this->model->select('*')->orderBy($sortName, $sort);

        return $builder->paginate(20);
    }

    public function getBrandsForSearch($search, $sortName, $sort, $currentPage=1){

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        //$where = strtolower($where);

        $builder = $this->model->select('*')->orderBy($sortName, $sort);
        if($search){
            $builder->whereRaw('lower(brand_name) like (?)',["%{$search}%"])
                ->orderBy('updated_at', 'desc');
        }

        return $builder->paginate(3);
    }

    public function one($aliasName,$alias, $attr = array()){
        $brand = parent::one($aliasName,$alias,$attr);

        return $brand;
    }

    public function addBrand($data, $logo = false) {

        //$data = $request->except('_token','brand_logo');

        if(empty($data)){
            return ['error' => 'Нет данных'];
        }
        if(empty( $data['brand_alias'])){
            $data['brand_alias'] = Str::slug($data['brand_name']);
        }


        if($this->one('brand_alias',$data['brand_alias'])){
            /*$request->merge(['brand_alias' => $data['brand_alias']]);
            $request->flash();*/

            return ['error' => 'Данный псевдоним уже используется'];
        }




        /*if($request->hasFile('brand_logo')){
            $image = $request->file('brand_logo');

            if($image->isValid()){
                $data['brand_logo'] = $this->resizeImage('brand',$image);
            }
        }*/

        $this->model->fill($data);

        if($this->model->save()){
            return ['status' => 'Добавление прошло успешно', 'brand_id'=> $this->model->brand_id];
        }
        return ['error' => 'Не удалось произвести сохранение'];
    }
    public function updateBrand($request, $brand) {

        $data = $request->except('_token','brand_logo','_method');

        if(empty($data)){
            return ['error' => 'Нет данных'];
        }
        if(empty( $data['brand_alias'])){
            $data['brand_alias'] = Str::slug($data['brand_name']);
        }

        $result = $this->one('brand_alias',$data['brand_alias']);

        if(isset($result->brand_id) && ($result->brand_id != $brand->brand_id)) {
            $request->merge(array('brand_alias' => $data['brand_alias']));
            $request->flash();

            return ['error' => 'Данный псевдоним уже успользуется'];
        }



        if($request->hasFile('brand_logo')){
            $image = $request->file('brand_logo');

            if($image->isValid()){
                $data['brand_logo'] = $this->resizeImage('brand',$image);
            }
        }

        if(isset($data['brand_logo']) && isset($brand->brand_logo)){
            foreach($brand->brand_logo as $item){
                $path = public_path('images/brands/'.$item);
                if(file_exists($path)){
                    unlink($path);
                }
            }
        }

        $brand->fill($data);
        if($brand->update()){

            return ['status' => 'Редактирование прошло успешно'];
        }
        return ['error' => 'Не удалось произвести Редактирование'];
    }

}
