<?

namespace App\Repositories;

use App\Models\Product;
use App\Models\Product_brand;
use Illuminate\Support\Str;

class ProductsRepository extends Repository {

    public function __construct(Product $product)
    {
        $this->model = $product;

    }

    public function one($aliasName,$alias, $attr = array()){
        $product = parent::one($aliasName,$alias,$attr);
        return $product;
    }

    public function getAdminProducts($category) {
        $builder = $this->model->select('*')->where('category_id',$category)->orderBy('created_at','desc');
        return $builder->paginate(30);
    }

    /*
     * category_id int
     * brand_id int
     * product_model int
     *
     * product_images json
     * product_desc text
     * */

    public function addProduct($data, $file =false) {

        $modelExist = false;

        //$data = $request->except('_token','product_images');

        if(empty($data))return ['error' => 'Нет данных'];

        $oldModel = $this->one('product_model',$data['product_model']);
        if($oldModel){
            $modelExist = true;
        }





        foreach ($data as $name=>$element){
            if(stripos($name,'opt_') === 0){
                $name = str_replace('opt_','', $name);
                $data_options[$name] = $element;
                unset($data['opt_'.$name]);
            }
        }

        $category = Product_brand::select('brand_name')->where('brand_id',$data['brand_id'])->first()->brand_name;
        $data_options['full_name'] = trim("$category {$data['product_model']} {$data_options['json_width']} {$data_options['json_height']} {$data_options['json_diameter']}");
        $data_options['full_name_alias'] = Str::slug($data_options['full_name']);

        if(!$modelExist){
            /*if($request->hasFile('product_images')){
                $image = $request->file('product_images');
                $prefix = 'product/'.$data['product_model'].'/';

                if($image->isValid()){
                    $data['product_images'] = $this->resizeImage($prefix,$image);
                }
            }*/

            $this->model->fill($data);
            /*TODO сразу заполнить опции?*/
            if($this->model->save()){
                $data_options['product_id'] = $this->model->product_id;
                return $data_options;
            }
        } else{
            $data_options['product_id'] = $oldModel->product_id;
            return $data_options;
        }




        return ['error' => 'Не удалось произвести сохранение'];
    }

}
