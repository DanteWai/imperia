<?

namespace App\Repositories;

use Debugbar;
use Illuminate\Support\Str;
use Image;

abstract class Repository {
    protected $model = false;

    public function get($select='*',$take=false,$where=false,$field=NULL){


        $builder = $this->model->select($select);

        if($take) { $builder->take($take);}


        if($where){
            $where = strtolower($where);
            //$builder->where('brand_name','ILIKE','%'.$where.'%');
            $builder->whereRaw('lower('.$field.') like (?)',["%{$where}%"]);
        }

        return $builder->get();
    }

    public function getSearch($select='*', $filter_name, $sort){
        $builder = $this->model->select($select)->orderBy($filter_name, $sort);
        return $builder->get();
    }

    public function one($aliasName, $alias,$attr = array()) {
		$result = $this->model->where($aliasName,$alias)->first();
		return $result;
	}

    public function resizeImage($prefix,$image,$settings=
    [
        'min' => [250,250],
        'mid' => [400,400],
        'max' => [800,800],
    ]){


        $str = Str::random(8);
        $img = Image::make($image);

        $obj = new \stdClass;
        $ext = explode('/', $img->mime())[1];
        $path =  public_path()."/images/{$prefix}/";

        if (!file_exists($path)) {
            mkdir($path, 666, true);
        }


        foreach($settings as $name=>$item){
            $obj->$name = $str.'_'.$name.'.'.$ext;

            $img->resize($item[0],$item[1], function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->save($path.$obj->$name);
        }

        return $obj;
    }



}
