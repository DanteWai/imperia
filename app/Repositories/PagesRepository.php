<?

namespace App\Repositories;

use App\Models\Page;
use Carbon\Carbon;
use Debugbar;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Str;



class PagesRepository extends Repository {

    public function __construct(Page $page)
    {
        $this->model = $page;
    }

    public function one($aliasName,$alias, $attr = array()){
        $page = parent::one($aliasName,$alias,$attr);
        return $page;
    }

    public function getPage($page){
        $builder = $this->model->where('page_alias',$page)->first();
        return $builder;
    }

    public function getPages(){
        $builder = $this->model->select('id','page_name','page_alias','updated_at')->orderBy('updated_at', 'desc');;
        return $builder->paginate(20);
    }

    public function getPagesForSearch($search,$currentPage,$sort,$sort_type){

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $builder = $this->model->select('id','page_name','page_alias','updated_at')->orderBy($sort_type, $sort);
        if($search){
            $builder->whereRaw('lower(page_name) like (?)',["%{$search}%"]);

        }

        return $builder->paginate(20);
    }

    public function addPage($request) {

        $data = $request->except('_token');

        if(empty($data)){
            return ['error' => 'Нет данных'];
        }

        if(empty( $data['page_alias'])){
            $data['page_alias'] = Str::slug($data['page_name']);
        }


        if($this->one('page_alias',$data['page_alias'])){
            $request->merge(['page_alias' => $data['page_alias']]);
            $request->flash();

            return ['error' => 'Данный псевдоним уже используется'];
        }



        $this->model->fill($data);

        if($this->model->save()){
            return ['status' => 'Добавление прошло успешно'];
        }
        return ['error' => 'Не удалось произвести сохранение'];
    }

    public function updatePage($request, $page) {

        $data = $request->except('_token','_method');

        if(empty($data)){
            return ['error' => 'Нет данных'];
        }
        if(empty( $data['page_alias'])){
            $data['page_alias'] = Str::slug($data['page_name']);
        }

        $result = $this->one('page_alias',$data['page_alias']);

        if(isset($result->id) && ($result->id != $page->id)) {
            $request->merge(array('page_alias' => $data['page_alias']));
            $request->flash();

            return ['error' => 'Данный псевдоним уже успользуется'];
        }




        $page->fill($data);
        if($page->update()){

            return ['status' => 'Редактирование прошло успешно'];
        }
        return ['error' => 'Не удалось произвести Редактирование'];
    }

}
