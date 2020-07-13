<?php

namespace App\Http\Controllers\Admin;

use App\Models\Price;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Imports\ProductImport;
use App\Modules\Parser;
use Excel;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Support\Str;


class PricListsController extends AdminController
{
    //

    public function __construct()
    {
        parent::__construct();
        $this->template = 'admin.index';
    }

    public function index(Request $request)
    {
        $this->title = 'Прайс листы';



        /*;*/

        $lists = new Price();
        $lists = $lists->select('*')->get();
        //dump($lists);


        $uri = $request->getPathInfo();
        $headContent = $this->headContent(['title' => $this->title, 'backUri' => dirname($uri), 'addUri' => $uri.'/add']);

        $this->content = view('admin.p_lists.index')->with([
            'top'=>$headContent,
            'lists' =>$lists
        ])->render();

        return $this->renderOutput();
    }

    public function add(Request $request)
    {
        $this->title = 'Добавление прайс листа';
        $uri = $request->getPathInfo();

        $headContent = $this->headContent(['title' => $this->title, 'backUri' => dirname($uri)]);

        $this->content = view('admin.p_lists.add')->with([
            'top'=>$headContent,
        ])->render();

        return $this->renderOutput();
    }

    public function testParse(Request $request)
    {
        $data = $request->except('_token');

        $parser = new Parser('123');
        $data = $parser->parseProduct($data);

        return response()->json($data);
    }

    public function addFromParse(Request $request)
    {
        $price_id = $this->addPrice($request);


        $data = $request->except('_token','product_images','brand','price');

        $brand_id = $this->b_rep->one('brand_alias',strtolower($request->brand));

        if(empty($brand_id)){
            $brand_id = $this->b_rep->addBrand([
                'brand_name' => $request->brand,
                'brand_alias' => strtolower($request->brand)
            ]);
            $data['brand_id'] = $brand_id['brand_id'];
        } else {
            $data['brand_id'] = $brand_id->brand_id;
        }

        $result = $this->p_rep->addProduct($data);


        if(is_array($result) && !empty($result['error'])) {
            return response()->json($result['error']);
        }

        $result['price'] = $request->price;
        $result['price_id'] = $price_id;
        $result = $this->o_rep->addOption($result);

        return response()->json($result);
    }
    public function addPrice(Request $request)
    {
        $data = $request->except('_token');

        $old = new Price();
        $old = $old->select('*')->where('price_alias',Str::slug($request->parser_name))->first();
        if(empty($old)){
            $price = new Price();
            $price->price_name = $request->parser_name;
            $price->price_alias = Str::slug($request->parser_name);
            $price->save();
            $id = $price->id;
        } else{
            $id = $old->id;
        }


        return $id;
    }


    public function import(Request $request)
    {

        $this->title = 'Добавление прайс листа';


        /*;*/


        //$parsers = $this->pars_rep->get();


        $array = Excel::toArray(new ProductImport, $request->file('list'));

        $counter = 0;

        foreach($array as $key=>$item){
            $header = $this->parseHead($item);

                foreach ($item as $keyRow=>$row){
                    $result = $this->parseRow($row,$header);
                    if($result){
                        /* todo отправка в парсер
                         if($key === 0 && $keyRow <11){
                            $parse = $parser->getContentProduct($result['value'],$parsers);
                            $result['value'] = array_merge($parse,$result['value']);
                        }*/


                        if($result['type'] === 's' && (int) $result['value']['radius'] > 13
                            && $result['value']['brand'] === 'Ханкук'
                            && trim($result['value']['all']) != 'Kinergy eco K425'
                            && trim($result['value']['all']) != 'Kinergy Eco 2 K435'
                        ){
                            $result['value']['brand'] = 'Hankook';
                            $newMass[$result['type']][] = $result['value'];
                            //dump($result['value']);
                            $counter++;
                        }

                    }


                    if($counter > 10) break;

                }
        }



        $this->title = 'Добавление прайс листа';


        $types = [
            's' => 'Шины',
            'd' => 'Диски',
            'un' => 'Неизвестно'
        ];

        $uri = $request->getPathInfo();

        $headContent = $this->headContent(['title' => $this->title, 'backUri' => dirname($uri)]);

        $this->content = view(env('THEME') . '.admin.p_lists.add')->with([
            'top'=>$headContent,
            'products' => $newMass,
            'types' => $types
        ])->render();

        return $this->renderOutput();



    }

    public function parseHead($mass){
        $header = false;

        foreach ($mass as $keyRow=>$row){

            if($keyRow > 20){
                break;
            }

            foreach ($row as $keyCol=>$column){
                if(strripos(mb_strtolower($column),'номенклатур')  !== false){
                    $header['nomen'] = $keyCol;

                    break;
                }
            }
        }

        return $header;
    }

    public function parseRow($row,$header){
        if(isset($header['nomen'])){
            $reg = '/(r ?[0-9]+|[0-9]([*]|x|х)[0-9]|[0-9]{2,3}\/[0-9]{2,3}\/[0-9]{2,3}|д\/ст|[0-9]+(,|.)[0-9]+)/iu';
            /* Проверяем что в строке шина или диск */
            if(preg_match($reg,$row[$header['nomen']]) && preg_match('/\w+\s+\w+/iu',$row[$header['nomen']])){
                if(preg_match('/([0-9]{3}\/[0-9]{2}| [0-9]{1}\.?[0-9]{2} R[0-9]{2})/u',$row[$header['nomen']])){
                    $type = 's';
                } else if(preg_match('/(д\/(л|ст)|[0-9]{1,2},?[0-9]*?[\*x][0-9]{2,3})/ui',$row[$header['nomen']])){
                    $type = 'd';
                }
                else{
                    $type = 'un';
                }
                $nomen = explode(' ',$row[$header['nomen']]);

                if($type === 's'){
                    $result = $this->sParse($nomen,$type);
                } else if($type === 'd'){
                    $result = $this->dParse($nomen,$type);
                }
                else{
                    $result = $this->sParse($nomen,$type);
                }

                return [
                    'type'=>$type,
                    'value'=>$result,
                ];
            }
            else{
                return false;
            }
        }

        else{
            return false;
        }

    }

    public function sParse($nomen,$type){
        $param['type'] = $type;
        foreach($nomen as $key=>$string){
            /*Ищем радиус */
            if(preg_match('/^z?r$/iu',$string) && isset($nomen[$key+1])){
                $param['radius'] = $string.$nomen[$key+1];
                unset($nomen[$key]);
                unset($nomen[$key+1]);
                continue;
            }
            else if(!isset($param['radius']) && preg_match('/^\/?[a-z]?r[0-9]+/iu',$string)){
                $param['radius'] = $string;
                unset($nomen[$key]);
                continue;
            }
            if(!isset($param['width']) && preg_match('/^[0-9]\.?[0-9]{1,2}/iu',$string) && $string < 300){
                $param['width'] = $string;
                unset($nomen[$key]);
                continue;
            }
            else if(!isset($param['width']) && preg_match('/[0-9]{3}\/[0-9]{2}/iu',$string)){
                $param['width'] = $string;
                unset($nomen[$key]);
                continue;
            }

            if(preg_match('/[0-9]{2,3}[a-zа-я]/iu',$string)){
                $param['index'] = $string;
                unset($nomen[$key]);
                continue;
            }else if(!isset($param['index']) && preg_match('/^[A-Z]$/u',$string)){
                $param['index'] = $string;
                unset($nomen[$key]);
                continue;
            }
            if(preg_match('/ш/iu',$string)){
                $param['spikes'] = $string;
                unset($nomen[$key]);
                continue;
            }

            if(preg_match('/автошина/iu',$string)){
                unset($nomen[$key]);
                continue;
            }
        }

        if(isset($param['width'])){
            $split = preg_split('/\//',$param['width']);

            /* Разбиваем ширину по слешу */
            $param['width'] = $split[0];
            if(isset($split[1])) {
                if(preg_match('/r[0-9]{2}/iu',$split[1])) $param['radius'] = $split[1];
                else $param['height'] = $split[1];
            }
            if(isset($split[2])) $param['radius'] = $split[2];

            $split = preg_split('/(x|X)/',$param['width']);
            /* Разбиваем ширину по x */
            $param['width'] = $split[0];
            if(isset($split[1])) $param['height'] = $split[1];

            preg_match('/[0-9]{3}/u',$param['width'],$matches, PREG_OFFSET_CAPTURE);

            if(isset($matches[0][0])){
                $other[] = str_replace($matches[0][0],'',$param['width']);
                $param['width'] = $matches[0][0];
            }

        }

        /* Проверяем что если заполнена ширина и индекс а высота нет то ставим прочерк */
        if(isset($param['width']) && isset($param['index']) && !isset($param['height'])){
            $param['height'] = "-";
        }
        /* Заводим переменную для шипов если шина */
        if(isset($param['width']) && isset($param['index']) && isset($param['height'])){
            $param['spikes'] = "-";
        }


        $param['spikes'] = "-";
        if(isset($param['radius'])){
            if(strripos($param['radius'],'ш') !== false){
                $param['radius'] = str_replace('ш','',$param['radius']);
                $param['spikes'] = 'Ш';
            }
        }

        $nomen = array_values($nomen);
        if(isset($nomen[0])){
            $param['brand'] = $nomen[0];
            unset($nomen[0]);
        }

        $param['all'] = implode(' ',$nomen);







        if(isset($other)){
            $other = implode(' ',$other);
            $param['all'] = $param['all'].' '.$other;
        }

        if(preg_match_all('/\(.+\)/iu',$param['all'],$matches)){

            foreach($matches as $sovp){
                foreach($sovp as $sovpDetail){
                    $param['all'] = str_replace($sovpDetail,' ',$param['all']);
                    if(isset($param['dop'])){
                        $param['dop'] = $param['dop'].' '.$sovpDetail;
                    } else{
                        $param['dop'] = $sovpDetail;
                    }
                }

            }
        }

        ksort($param);
        return $param;
    }

    /*
    сверловка+
    диаметр+
    ширина
    вылет
    DIA
    производитель
     */
    public function dParse($nomen,$type){
        $param['type'] = $type;

        foreach($nomen as $key=>$string){

            /*Ищем радиус */
            if(preg_match('/^\d[\*x]\d{2,}/ium',$string)){
                $param['drilling'] = $string;
                unset($nomen[$key]);
                continue;
            }
            if(preg_match('/R\d{2,}/um',$string)){
                $param['diametr'] = $string;
                unset($nomen[$key]);
                continue;
            } else if(preg_match('/\d{1,2},\d{1,2}x\d{2}/um',$string)){
                $m = explode('x',$string);
                $param['width'] = $m[0];
                $param['diametr'] = $m[1];
                unset($nomen[$key]);
                continue;
            }
            if(preg_match('/J\d[.,]?/um',$string)){
                $param['width'] = $string;
                unset($nomen[$key]);
                continue;
            }
            if(preg_match('/ET\d/ium',$string)){
                $param['departure'] = $string;
                unset($nomen[$key]);
                continue;
            }

            if(preg_match('/^\d{2,3}[^-_][.,]?/um',$string)){
                $param['dia'] = $string;
                unset($nomen[$key]);
                continue;
            }
        }

        if(!isset($param['drilling'])) $param['drilling'] = '-';
        if(!isset($param['diametr'])) $param['diametr'] = '-';

        if(isset($param['drilling']) && isset($param['diametr']) && !isset($param['width']))
            $param['width'] = '-';

        if(isset($param['drilling']) && isset($param['diametr']) && !isset($param['departure']))
            $param['departure'] = '-';

        if(isset($param['drilling']) && isset($param['diametr']) && !isset($param['dia']))
            $param['dia'] = '-';


        /*$nomen = array_values($nomen);
        $param['brand'] = $nomen[0];
        unset($nomen[0]);*/

        $param['all'] = implode(' ',$nomen);


        if(isset($other)){
            $other = implode(' ',$other);
            $param['all'] = $param['all'].' '.$other;
        }
        ksort($param);

        return $param;
    }
}
