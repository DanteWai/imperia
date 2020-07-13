<?

namespace App\Repositories;

use App\Models\Parser;
use Illuminate\Support\Str;

class ParsersRepository extends Repository {

    public function __construct(Parser $parser)
    {
        $this->model = $parser;
    }

    /*public function one($alias,$attr = array()) {
		$parser = parent::one($alias,$attr);


		return $parser;
	}*/

    public function addParser($request) {

        $data = $request->except('_token');

        $insert['parser_name'] = $data['parser_name'];
        $insert['parser_alias'] =Str::slug($data['parser_name']);
        unset($data['parser_name']);

		if($this->one($insert['parser_alias'],FALSE)) {
			$request->merge(array('parser_alias' => $data['parser_alias']));
			$request->flash();

			return ['error' => 'Данный псевдоним уже успользуется'];
		}




        foreach($data as $key=>$item){
            if(!$item)
            unset($data[$key]);
        }
        $insert['parser_options'] = json_encode($data);

        $this->model->fill($insert);
        $this->model->save();
    }


    public function updateParser($request,$parser) {

        $data = $request->except('_token');

        $insert['parser_name'] = $data['parser_name'];
        $insert['parser_alias'] =Str::slug($data['parser_name']);
        unset($data['parser_name']);

        $model = $this->one($insert['parser_alias'],FALSE);
		if(isset($model->id) && $model->id != $parser->id) {
			$request->merge(array('parser_alias' => $insert['parser_alias']));
			$request->flash();
			return ['error' => 'Данный псевдоним уже успользуется'];
		}




        foreach($data as $key=>$item){
            if(!$item)
            unset($data[$key]);
        }
        $insert['parser_options'] = json_encode($data);

		$parser->fill($insert);
		if($parser->update()) {
			return ['status' => 'Материал обновлен'];
		}
    }


}
