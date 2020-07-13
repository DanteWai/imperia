<?

namespace App\Repositories;

use App\Models\Product_category;

class CategoriesRepository extends Repository {

    public function __construct(Product_category $categories)
    {
        $this->model = $categories;
    }

    public function getIdFromAlias($alias){
        $builder = $this->model->select('category_id')->where('category_alias',$alias);

        return $builder->first();
    }
    public function getIdFromId($id){
        $builder = $this->model->select('category_name')->where('category_id',$id);

        return $builder->first();
    }

}
