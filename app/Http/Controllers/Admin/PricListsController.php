<?php

namespace App\Http\Controllers\Admin;

use App\Models\Brand_alias;
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


    //Главная страница
    public function index(Request $request)
    {
        $this->title = 'Прайс листы';

        $lists = new Price();
        $lists = $lists->select('*')->get();

        $uri = $request->getPathInfo();
        $headContent = $this->headContent(['title' => $this->title, 'backUri' => dirname($uri), 'addUri' => $uri.'/add']);

        $this->content = view('admin.p_lists.index')->with([
            'top'=>$headContent,
            'lists' =>$lists
        ])->render();

        return $this->renderOutput();
    }

    //Страница с добавлением прайс листа
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


    //Сохранение прайслиста
    public function addPrice(Request $request)
    {
        $data = $request->except('_token');

        $old = new Price();
        $old = $old->select('*')->where('price_alias',Str::slug($request->parser_name))->first();
        if(empty($old)){
            $price = new Price();
            $price->price_name = $request->parser_name;
            $price->price_alias = Str::slug($request->parser_name);
            //$price->options =
            $price->save();
            $id = $price->id;
        } else{
            $id = $old->id;
        }


        return $id;
    }


    //ИМПОРТ ИЗ ЭКСЕЛЯ
    public function import(Request $request)
    {
        /* Получить
         * Brand_alias::all()
         *
         * Добавить
         * $alias = new Brand_alias;
        $alias->alias_name = 'test';
        $alias->brand_id = 1;
        $alias->save();*/

        $this->title = 'Добавление прайс листа';
        $uri = $request->getPathInfo();
        $headContent = $this->headContent(['title' => $this->title, 'backUri' => dirname($uri)]);

        $title = $request->only('parser_name');
        $options = $request->except('list','_token','parser_name');

        $array = Excel::toArray(new ProductImport, $request->file('list'));

        //dd($data);
        //dump($data);
        //dump($array);
        //dd($options);

        // dd($array[0][1]); // строка в excel
        //dd($options['colNum']); // вывод одной опции


        $brands = [];

        foreach($array as $key=>$item){

            $header = $this->parseHead($item);

            // Проверяет наличие позиции бренда в номенклатуре
            if(isset($options['brand_position'])) {
                $header['brand_position'] = intval($options['brand_position']) - 1;
            }

            // Если колонка "Номенклатура" не нашлась
            if (!isset($header['nomen'])) {

                if (isset($options['rowNum'])) {
                    $row = intval($options['rowNum']) - 1;      // Номер строки заголовков таблицы
                    $column = [];                               // Массив для номеров столбцов

                    foreach($array[$key][$row] as $col => $title) {

                        switch (true) {
                            case preg_match_all('/производитель|бренд/iu', $title):
                                $column['brand_col'] = $col;                      // Столбец производителя
                                break;
                            case preg_match_all('/модель/iu', $title):
                                $column['model_col'] = $col;                      // Столбец модели
                                break;
                            case preg_match_all('/ширина/iu', $title):
                                $column['width_col'] = $col;                      // Столбец ширины
                                break;
                            case preg_match_all('/высота/iu', $title):
                                $column['height_col'] = $col;                      // Столбец высоты
                                break;
                            case preg_match_all('/^индекс$/ium', $title):
                                $column['index_col'] = $col;                      // Столбец индекс общий
                                break;
                            case preg_match('/индекс\sскорости|скорост/iu', $title):
                                $column['index_speed_col'] = $col;                      // Столбец индекса скорости
                                break;
                            case preg_match('/индекс\sнагрузки|нагруз/iu', $title):
                                $column['index_load_col'] = $col;                      // Столбец индекса нагрузки
                                break;
                            case preg_match_all('/^R$|^диаметр$|диаметр\sдиска|диаметр\sшины/ium', $title):
                                $column['diameter_col'] = $col;                      // Столбец диаметра диска
                                break;
                            case preg_match_all('/сверловка/iu', $title):
                                $column['drilling_col'] = $col;                      // Столбец сверловки
                                break;
                            case preg_match_all('/вылет/iu', $title):
                                $column['departure_col'] = $col;                      // Столбец вылета
                                break;
                            case preg_match_all('/отверстие|^центральное\sотверстие$|^dia$|dia|^диаметр\sступицы$|ступиц|диаметр\sступиц/ium', $title):
                                $column['dia_col'] = $col;                      // Столбец dia
                                break;
                            case preg_match_all('/отверстий|количество\sотверстий/iu', $title):
                                $column['hole_col'] = $col;                      // Столбец отверстий
                                break;
                            case preg_match_all('/^pcd$|pcd|^Расстояние\sмежду\sотверстиями$|отверстиями|между\sотверстиями/ium', $title):
                                $column['s_hole_col'] = $col;                      // Столбец Расстояние между отверстиями
                                break;
                        }
                    }

                    // Дальше - после того, как узнали столбцы

                    // Узнаем что именно нужно парсить - шины или диски
                    if ((isset($options['priceType']) && $options['priceType'] === 'diski') ||
                        isset($column['drilling_col']) ||
                        isset($column['departure_col']) ||
                        isset($column['dia_col']) ||
                        isset($column['hole_col']) ||
                        isset($column['s_hole_col'])) {

                        $result = $this -> diskParse($row + 1, $item, $column);    // Если передана опция "тип прайс-листа" или в массиве столбцов есть параметры диска
                        if ($result) {

                            if (!isset($brands['d'])) {
                                $brands['d'] = $result['brands'];
                            } else {
                                $brands['d'] = array_merge($brands['d'], $result['brands']);
                            }
                            
                            unset($result['brands']);

                            if (!isset($newMass['d'])) {
                                $newMass['d'] = $result;
                            } else {
                                $newMass['d'] = array_merge($newMass['d'], $result);
                            }

                        }

                    } else if (
                        // Условия для парсинга шин
                        (isset($options['priceType']) && $options['priceType'] === 'shiny') ||
                        isset($column['height_col']) ||
                        isset($column['index_col']) ||
                        isset($column['index_speed_col']) ||
                        isset($column['index_load_col'])
                    ) {
                        
                        $result = $this -> shinParse($row + 1, $item, $column);    // Если передана опция "тип прайс-листа" или в массиве столбцов есть параметры шины

                        if ($result) {

                            if (!isset($brands['s'])) {
                                $brands['s'] = $result['brands'];
                            } else {
                                $brands['s'] = array_merge($brands['s'], $result['brands']);
                            }
                            
                            unset($result['brands']);

                            if (!isset($newMass['s'])) {
                                $newMass['s'] = $result;
                            } else {
                                $newMass['s'] = array_merge($newMass['s'], $result);
                            }

                        }

                    }


                } else {

                    // Тут надо выкинуть ошибку пользователю, что он должен заполнить поле "Строка заголовков"
                    dd('Ты обосрался!! Надо было указать строку заголовков');
                    return false;
                }
            } else {

                // Парсим каждую строчку
                foreach ($item as $keyRow=>$row){
                    $result = $this->parseRow($row,$header);

                    if($result){

                        // Если массив брендом пустой и текущий бренд не пустая строка и не равна "-", то заносим в массив текущий бренд
                        if (!isset($brands[$result['type']]) && !empty($result['value']['brand']) && $result['value']['brand'] !== '-') {
                            $brands[$result['type']][] = $result['value']['brand'];
                            $newMass[$result['type']][] = $result['value'];
                            // Если массив брендов уже есть и текущий бренд еще не существует в массиве то заносим его
                        } else if (isset($brands[$result['type']]) && !in_array($result['value']['brand'], $brands[$result['type']]) && !empty($result['value']['brand']) && $result['value']['brand'] !== '-') {
                            $brands[$result['type']][] = $result['value']['brand'];
                            $newMass[$result['type']][] = $result['value'];
                        } else {
                            $newMass[$result['type']][] = $result['value'];
                            continue;
                        }
                    }
                }

            }

        }

        $isset_brand = $this -> brandsAliases($brands);

        //dd($brand_alias);   // алиасы брендов
        //dd($new_brands);
        //dd($brands);
        //dd($brands_site);
        //dd($isset_brand);
        //dd($newMass);


        //заглушка если ничё не напарсили
        if(!isset($newMass)) $newMass = [];

        $types = [
            's' => 'Шины',
            'd' => 'Диски',
            'un' => 'Неизвестно'
        ];

        //dd($newMass);

        //формируем вид
        $this->content = view('admin.p_lists.add')->with([
            'top'=>$headContent,
            'products' => $newMass,
            'types' => $types,
            'brands' => $isset_brand
        ])->render();

        return $this->renderOutput();
    }

    public function brandsAliases ($brands) {

        $all_brands = $this -> b_rep -> get(['brand_name', 'category'])->toArray();
        $brands_site = [];
        foreach ($all_brands as $item) {
            $categories = json_decode($item['category']);

            foreach ($categories as $category) {
                if ($category == 1) $brands_site['s'][] = $item['brand_name'];
                if ($category == 2) $brands_site['d'][] = $item['brand_name'];
            }
        }

        // TODO - временная хуйня
        $brands_site['un'] = [];
        // TODO

        // получаем алиасы брендов
        $brands_alias = Brand_alias::all() -> toArray();
        foreach ($brands_alias as $item => $value) {
            $brand_alias[$item]['alias'] = $value['alias_name'];
            //$brand_alias[$item]['id'] = $value['brand_id'];
            $brand_alias[$item]['original_name'] = $this -> b_rep -> one('brand_id', $value['brand_id']) -> toArray()['brand_name'];
        }

        // Делаем массив для поиска по алиасу
        if (count($brands_alias) !== 0) {
            foreach ($brand_alias as $key => $value) {
                $aliases[] = $value['alias'];
            }
        }

        // == Сравниваем существующие бренды с найденными
        foreach ($brands as $key => $item) {
            foreach ($item as $value) {
                // value - строка со значением бренда
                // item - массив брендов категории
                // key - s d

                if (in_array($value, $brands_site[$key])) {
                    $isset_brand[$key][$value]['isset'] = true;
                    $isset_brand[$key][$value]['alias'] = mb_strtolower($value);

                    // Проверяем наличие алиаса
                    if (count($brands_alias) !== 0) {
                        $index = array_search($isset_brand[$key][$value]['alias'] ,$aliases);
                        if ($index !== false) {
                            $isset_brand[$key][$value]['alias_isset'] = true;
                            $isset_brand[$key][$value]['original_name'] = $brand_alias[$index]['original_name'];
                        } else {
                            $isset_brand[$key][$value]['alias_isset'] = false;
                        }
                    } else {
                        $isset_brand[$key][$value]['alias_isset'] = false;
                    }

                } else {
                    $isset_brand[$key][$value]['isset'] = false;
                    $isset_brand[$key][$value]['alias'] = mb_strtolower($value);

                    // Проверяем наличие алиаса
                    if (count($brands_alias) !== 0) {
                        $index = array_search($isset_brand[$key][$value]['alias'] ,$aliases);
                        if ($index !== false) {
                            $isset_brand[$key][$value]['alias_isset'] = true;
                            $isset_brand[$key][$value]['original_name'] = $brand_alias[$index]['original_name'];
                        } else {
                            $isset_brand[$key][$value]['alias_isset'] = false;
                        }
                    } else {
                        $isset_brand[$key][$value]['alias_isset'] = false;
                    }
                }
            }
        }

        return $isset_brand;

    }

    //Нахождения заголовка таблицы и колонки с номенкулатурой, плюс помогает отсечь левые строки перед таблицей
    public function parseHead($mass){


        //Устроена она максимально тупо, она ищет заголовок начинающийся "номенклатур"
        $header = false;

        foreach ($mass as $keyRow=>$row){

            if($keyRow > 20){
                break;
            }

            foreach ($row as $keyCol=>$column){
                if((strripos(mb_strtolower($column),'номенклатур')  !== false) && !isset($header['nomen'])){
                    $header['nomen'] = $keyCol;
                    //break;
                    continue;
                }

                // Ищем столбец бренда
                if (preg_match('/производитель|бренд/iu', $column)) {
                    $header['brand'] = $keyCol;
                    continue;
                }

                // Выход из цикла
                if (isset($header['nomen']) && isset($header['brand'])) {
                    break;
                }
            }
        }

        return $header;
    }

    //Парсинг каждой отдельной строчки
    public function parseRow($row,$header){
        //Тут сейчас всё толкается от номенкулатуры "$header['nomen']" но в хеадере задумываются и прочие разделы врое count, price
        if(isset($header['nomen'])){
            $reg = '/(r ?[0-9]+|[0-9]([*]|x|х)[0-9]|[0-9]{2,3}\/[0-9]{2,3}\/[0-9]{2,3}|д\/ст|[0-9]+(,|.)[0-9]+)/iu';
            /* Проверяем что в строке шина или диск */ // /\w+\s+\w+/iug // /[a-z]+\s+[a-z]+|[а-яё]+\s(\d+|[а-яё]+)|^[^а-яё\d\s]+$/iugm
            if(preg_match_all($reg,$row[$header['nomen']]) && preg_match('/\w+\s+\w+|^[а-яё]+|^[^а-яё]+$/ium',$row[$header['nomen']])){ // [0)-9]{1}\.?[0-9]{2}\sR[0-9]{2}|
                if(preg_match('/^[0-9]{3}\/[0-9]{2,3}|\s[1-3][0-9]{2}\/[0-9]{2,3}\s|\s[0-9]{3}\/[0-9]{2,3}\/\d{2}\s|\d{3}\/\d{2,3}R\d{2}C?|\b\d{3}\/\d{2}\/\d{2}C?\b|\s\b1?\d{2}[HJ-NP-WYZТ]\b(?!\))|\s\b\d{2,3}\/\d{2,3}[HJ-NP-WYZТ]\b(?!\))|\b\d{1,2}[,\.]\d{2}\s?R\d{2}\b|[Кк]ама\s|\bSR[12]\d\b|\b[12]\d{2}\sR[12]\b|^\b[1-3]\d{2}\sR[12]\dC?\b|\b\d{1,2}[,\.]?\d?\/\d{2}[,\.]?\d?\/\d{2}\b|\b\d[,\.][50]0\/\d{2}\/\d{2}C?\b|\b\d{2}x\d{2}[,\.]?[50]?\sR[12]\d\b|\b\s[1-3]\d{2}\sR[12]\d\b|\b[1-3]\d{2}\/\d{2}-[12]\d\b|(^[Аа]втошина|^[сС]ельхозшина|^[Ии]ндустриальная)/um',$row[$header['nomen']]) && !preg_match('/\b(12|16|24)V\b|[Аа]ккумулятор|[Сс]в\.заж|[Аа]\/л|[Тт]орм\.кол/u' ,$row[$header['nomen']]) && !preg_match('/^[1-4]\d{2}\/?\d{0,2}\s?R?\s?[12]\d[,\.]?[50]?C?(\sШИП)?$|^\d{2}x\d{2}[,\.]?[50]\sR[12]\d$|^\d{1,2}[,\.]\d{0,2}\s?R?[12]\d[,\.]?\d{0,2}(\s\(.*\))?$|^[1-4]\d{2}\/?\d{0,2}\s?R?\s?[12]\d[,\.]?[50]?\s"?.*"$/um', trim($row[$header['nomen']]))){
                    $type = 's';
                } else if(preg_match('/(^д\/(л|ст)|^(ст|л) диск| \d{1,2},?[0-9]*?[\*x][0-9]{2,3}[,\.]?\d? |^\d[\*x\-]\d{2,3},?\d?[\*x\-]\d{2}|\b(et|ет)\d{2,3}[,\.]?\d?\b)/uim', trim($row[$header['nomen']])) && preg_match('/^д\/(л|ст)|^(ст|л) диск|диск|\bR[12]\d\b|\b(et|ет)[02-9]\d{2}\b\s/uim', $row[$header['nomen']])){
                    $type = 'd';
                }
                else{
                    $type = 'un';
                }
                //$nomen = explode(' ',$row[$header['nomen']]);
                $nomen = $row[$header['nomen']];    // Строка номенклатуры

                if (isset($header['brand'])) {
                    $brand_name = $row[$header['brand']];
                } else {
                    $brand_name = null;
                }

                if (isset($header['brand_position'])) {
                    $brand_position = $header['brand_position'];
                } else {
                    $brand_position = null;
                }

                if($type === 's'){
                    //Если в строке шины то запускаем функцию парсинга шины
                    $result = $this->sParse($nomen,$type,$brand_name,$brand_position);
                } else if($type === 'd'){
                    //Если диск то парсим как диск
                    $result = $this->dParse($nomen,$type,$brand_name,$brand_position);
                }
                else{
                    //заглушка
                    $result = $this->sParse($nomen,$type,$brand_name,$brand_position);
                }

                //Возвращаем тип и распаршенную строчку
                return [
                    'type'=>$type,
                    'value'=>$result,
                ];
            }
            else{
                return false;
            }
        }

        // Если номенклатура не найдена
        else {
            return false;
        }

    }

    //Парсинг инфы о шине
    public function sParse($nomen,$type,$brand,$position){
        //dump($position);
        //$nomen = 'автошина 6,50 R16C HANKOOK AH11S 10PR 108/107M        ';

        // Если передана позиция бренда в номенклатуре то - разбить строку по пробелу, вытащить бренд и проверить на соответствие решулярки
        if (isset($position)) {
            //$nomen = explode(' ',$row[$header['nomen']]);
            $brand_search = explode(' ', $nomen);
            $pattern_brand = '/^[a-zа-яё\-\_\']{2,}$/ium';
            if (isset($brand_search[$position]) && preg_match($pattern_brand, $brand_search[$position])) {
                $param['brand'] = $brand_search[$position];
            } else if (isset($brand_search[$position - 1]) && preg_match($pattern_brand, $brand_search[$position - 1])) {
                $param['brand'] = $brand_search[$position - 1];
            } else if (isset($brand_search[$position + 1]) && preg_match($pattern_brand, $brand_search[$position + 1])) {
                $param['brand'] = $brand_search[$position + 1];
            }
        }

        // Если бренд берется из отдельного столбца
        if (isset($brand) && !empty($brand) && preg_match('/^[a-zа-яё\-\_\']{2,}\.?(\s[a-zа-яё\-\_\'\(\)]{2,}\.?)?$/ium', $brand)) {
            $param['brand'] = $brand;
        } else if (!isset($brand)) {
            $nomen_brand = preg_replace('/^(авто|сельхоз)шина|^индустриальная|(авто|а)\/?шина|(?<=\s)шип(?=\s)|(?<=\s)шип$/imu', '', $nomen);
            $brand_search = explode(' ', $nomen_brand);
            $pattern_brand = '/^[a-zа-яё\-\_\']{2,}\.?(\s[a-zа-яё\-\_\'\(\)]{2,}\.?)?$/ium';
            foreach ($brand_search as $position => $name) {
                if (preg_match($pattern_brand, $name) && !isset($param['brand'])) {
                    $param['brand'] = $name;
                    break;
                }
            }
        }

        $param['type'] = $type;
        //dump($param);

        // Очищаем номенклатуру от лишних слов
        $nomen = preg_replace('/^(авто|сельхоз)шина|^индустриальная|(авто|а)\/?шина/imu', '', $nomen);

        while (!empty($nomen) && (
            !isset($param['brand']) ||
            !isset($param['all']) ||
            !isset($param['width']) ||
            !isset($param['height']) ||
            !isset($param['radius']) ||
            !isset($param['index_load']) ||
            !isset($param['index_speed']))) {

            // Диаметр      //(?<![A-Za-zа-яёА-ЯЁ])R[12]\d[,\.]?[50]?C?|(?<=\s)[-xXхХ]R?[12]\d[,\.]?[50]?C?|(?<=[1-4]\d{2}[\/xXхХ\s\:-]\d{2}[\/xXхХ\s\:-]|\d{2}[\/xXхХ\s\:-]\d{2}|\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d|\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d{2}|\d{2}[,\.]\d[\/xXхХ\s\:-]\d{2}|\d{2}[,\.]\d[\/xXхХ\s\:-]\d{2}[,\.]\d|\d{2}[,\.]\d[\/xXхХ\s\:-]\d{2}[,\.]\d{2}|\d{2}[,\.]\d{2}[\/xXхХ\s\:-]\d{2}|\d{2}[,\.]\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d|\d{2}[,\.]\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d{2}|[,\.][50][\/xXхХ\s\:-]\d{2}|\d{2}[\/xXхХ\s\:-]\d[,\.]\d{2})[\/xXхХ\s\:-]R?\s?[12]\d[,\.]?[50]?C?|(?<=\d{2})-\s[12]\d[,\.]?5?|(?<=\s)ZR\s?[12]\d[,\.]?5?(?=\s)|(?<=\s)ZR\s?[12]\d[,\.]?5?$
            if (!isset($param['radius']) && preg_match('/(?<![A-Za-zа-яёА-ЯЁ])R\s?[12]\d[,\.]?[50]?C?|(?<=\s)[-xXхХ]R?[12]\d[,\.]?[50]?C?|(?<=[1-4]\d{2}[\/xXхХ\s\:-]\d{2}[\/xXхХ\s\:-]|\d{2}[\/xXхХ\s\:-]\d{2}|\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d|\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d{2}|\d{2}[,\.]\d[\/xXхХ\s\:-]\d{2}|\d{2}[,\.]\d[\/xXхХ\s\:-]\d{2}[,\.]\d|\d{2}[,\.]\d[\/xXхХ\s\:-]\d{2}[,\.]\d{2}|\d{2}[,\.]\d{2}[\/xXхХ\s\:-]\d{2}|\d{2}[,\.]\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d|\d{2}[,\.]\d{2}[\/xXхХ\s\:-]\d{2}[,\.]\d{2}|[,\.][50][\/xXхХ\s\:-]\d{2}|\d{2}[\/xXхХ\s\:-]\d[,\.]\d{2}|\d{2}[\/xXхХ\s\:-]\d[,\.]\d|\d[\/xXхХ\s\:-]\d{2})[\/xXхХ\s\:-]R?\s?[12]\d[,\.]?[50]?C?(?=\s[^R])|(?<=\d{2})-\s[12]\d[,\.]?5?|(?<=\s)ZR\s?[12]\d[,\.]?5?(?=\s)|(?<=\s)ZR\s?[12]\d[,\.]?5?$/mu', $nomen, $diameter)) {
                $nomen = str_replace($diameter[0], '', $nomen);     // Стираем найденное совпадение
                preg_match('/[12]\d[,\.]?\d{0,2}C?/u', $diameter[0], $value);  // Вытаскиваем диаметр, без символов и R
                $param['radius'] = preg_replace(['/(?<=[,\.])0+/', '/(?<=[,\.]\d)0+/', '/,/', '/\.$/m'], ['', '', '.', ''], $value[0]);    // Заносим значение в массив параметров
            } else if (isset($param['radius'])) {

            } else {
                $param['radius'] = '-';
            }

            //dump($nomen);

            // Индекс общий     //(?<![\w\/])1?\d{1,2}\/1?\d{1,2}[GHJ-NP-WYZTТМН](?![a-zA-Zа-чщ-яё])|(?<!\w)1?\d{1,2}[GHJ-NP-WYZTТМН](?![a-zA-Zа-чщ-яё])|(?<![\w\/])1\d{2}[B-GJ-N](?![a-zA-Zа-чщ-яё])|(?<![\w\/])1\d{2}[АA][1-7](?!\w)|(?<![\w,])1?\d{1,2}[HJ-NP-WYZTТМН](?=[a-zA-Z]{2})
            if (preg_match('/(?<![\w\/])1?\d{1,2}\/1?\d{1,2}[GHJ-NP-WYZTТМНК](?![a-zA-Zа-чщ-яё])|(?<![\w\*])1?(\d{2}|0)[GHJ-NP-WYZTТМНК](?![a-zA-Zа-чщ-яё])|(?<![\w\/])1\d{2}[B-GJ-N](?![a-zA-Zа-чщ-яё])|(?<![\w\/])1\d{2}[АA][1-7](?!\w)|(?<![\w,\*])1?\d{1,2}[HJ-NP-WYZTТМНК](?=[a-zA-Z]{2})|(?<![\w\/])1?\d{1,2}\/1?\d{1,2}\s?[GHJ-NP-WYZTТМНК](?=\s)|(?<![\w\*])1?(\d{2}|0)\s?[GHJ-NP-WYZTТМНК](?=\s)|(?<![\w\/])1?\d{1,2}\/1?\d{1,2}\s?[GHJ-NP-WYZTТМНК]$|(?<!\w)1?\d{1,2}\s?[GHJ-NP-WYZTТМНК]$/mu', $nomen, $index)) {
                $nomen = str_replace($index[0], '', $nomen);
                preg_match('/\d{1,3}\/?\d{0,3}/u', $index[0], $value_load);
                preg_match('/[АA-ZТМНК][1-7]?/u', $index[0], $value_speed);
                $param['index_load'] = $value_load[0];
                $param['index_speed'] = $value_speed[0];

                // Индекс скорости, если нет общего
            } else if (!isset($param['index_load']) && preg_match('/\s([HJ-NP-WYZTТМК]|[B-GJ-N]|A[1-7])\s|(?<=\s)([HJ-NP-WYZTТМК]|[B-GJ-N]|A[1-7])$/mu', $nomen, $speed)) {
                $nomen = str_replace($speed[0], '', $nomen);
                preg_match('/[АA-ZТМ][1-7]?/u', $speed[0], $value);
                $param['index_speed'] = $value[0];
                $param['index_load'] = '-';
            } else if (!isset($param['index_load']) && !isset($param['index_speed'])) {
                $param['index_speed'] = '-';
                $param['index_load'] = '-';
            } else {

            }

            // Ширина и высота      //^[1-4]?\d{2}[\/xXхХ\:-]\d{1,2}[,\.]?[50]{0,2}|(?<=\s)[1-4]?\d{1,2}[,\.]?[50]{0,2}[\/xXхХ\:-](\d{2}|\d{2}[,\.]\d|\d{2}[,\.]\d{2}|\d|\d[,\.]\d|\d[,\.]\d{2})(?![a-zA-Z0-9])
            if (preg_match('/^[1-4]?\d{2}[\/xXхХ\:-]\d{1,2}[,\.]?[50]{0,2}|(?<=\s)[1-4]?\d{1,2}[,\.]?[50]{0,2}[\/xXхХ\:-](\d{2}[,\.]\d{2}|\d{2}[,\.][50]|\d{2}|\d[,\.]\d{2}|\d[,\.][50]|[0-35-9])(?![a-zA-Z0-9])/mu', $nomen, $size)) {
                $nomen = str_replace($size[0], '', $nomen);
                //dd($nomen);
                $size_value = preg_split('/[\/xXхХ\s\:-]/u', $size[0]);
                $param['width'] = preg_replace(['/(?<=[,\.])0+$/m', '/(?<=[,\.]\d)0+$/m', '/,/', '/\.$/m'], ['', '', '.', ''], $size_value[0]);
                $param['height'] = preg_replace(['/(?<=[,\.])0+$/m', '/(?<=[,\.]\d)0+$/m', '/,/', '/\.$/m'], ['', '', '.', ''], $size_value[1]);

                // Ширина, если без высоты
            } else if (!isset($param['width']) && preg_match('/^[1-4]\d{2}(?=\s)|^\s[1-4]\d{2}(?=\s)|^\d{1,2}[,\.]?[50]{0,2}(?=\s)|(?<=\s)\d{1,2}[,\.]\d{1,2}(?=[\sR])|(?<=\s)[1-4]\d[05](?=[\sRш])|(?<=\s)[1-4]\d{2}(?=\/\s)/mu', $nomen, $width)) {
                $nomen = str_replace($width[0], '', $nomen);
                $param['width'] = trim(preg_replace(['/(?<=[,\.])0+$/m', '/(?<=[,\.]\d)0+$/m', '/,/', '/\.$/m'], ['', '', '.', ''], $width[0]));   // Убираем в конце нули и заменяем запятые на точки
                $param['height'] = '-';
            } else if (!isset($param['width']) && !isset($param['height'])) {
                $param['width'] = '-';
                $param['height'] = '-';
            } else {

            }

            // Шипы
            if (!isset($param['spikes']) && preg_match('/(?<![a-zа-я])([\*]?ш|шип)[\.]?(?=\s)|(Ш|шип)[\.]?$/ium', $nomen, $spikes)) {
                $nomen = str_replace($spikes[0], '', $nomen);
                $param['spikes'] = 'Да';
                $param['season'] = 'Зима';
            }

            // Очищаем лишние пробелы
            $nomen = trim(preg_replace('/\s{2,}/', ' ', $nomen));

            if (!isset($param['brand'])) {
                $param['brand'] = '-';
            } else {
                $nomen = preg_replace(['/' . $param['brand'] . '/iu', '/\s+|\(\)|\_+/', '/^\s?[^\wа-яё\(]/ium'], ['', ' ', ''], $nomen);
                $param['brand'] = str_replace('_', ' ', $param['brand']);

                if (!empty($nomen)) {
                    $param['all'] = trim($nomen);
                } else {
                    $param['all'] = '-';
                }

            }
            if (!isset($param['all'])) {
                $param['all'] = trim($nomen);
            } else {

            }

            //dd($param);
            //dd($nomen);
            //dump($param);
        }

        //dd($param);

        return $param;




        /*foreach($nomen as $key=>$string){*/
            /*Ищем радиус */
            /*if(preg_match('/^z?r$/iu',$string) && isset($nomen[$key+1])){
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

            if(preg_match('/\b\d{2,3}[HJ-NP-WYZ]\b|\b\d{2,3}\/\d{2,3}[HJ-NP-WYZ]\b/u',$string)){
                $param['index'] = $string;
                preg_match('/\d{2,3}|\d{2,3}\/\d{2,3}/u', $param['index'], $matches);
                $param['index_load'] = $matches[0];
                preg_match('/[HJ-NP-WYZ]/u', $param['index'], $matches);
                $param['index_speed'] = $matches[0];
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
        }*/

        //

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

    //Парсинг инфы о диске
    public function dParse($nomen,$type,$brand,$position){

        if (isset($position)) {
            $nomen = preg_replace('/\s{2,}/', ' ', $nomen);
            $brand_search = explode(' ', $nomen);
            $pattern_brand = '/^[a-zа-яё\-\_\'\&]+\.?(\s?[a-zа-яё\-\_\'\(\)\&]+\.?)?$/ium';
            if (isset($brand_search[$position]) && preg_match($pattern_brand, $brand_search[$position])) {
                $param['brand'] = $brand_search[$position];
            } else if (isset($brand_search[$position - 1]) && preg_match($pattern_brand, $brand_search[$position - 1])) {
                $param['brand'] = $brand_search[$position - 1];
            } else if (isset($brand_search[$position + 1]) && preg_match($pattern_brand, $brand_search[$position + 1])) {
                $param['brand'] = $brand_search[$position + 1];
            }
        }

        // Если бренд берется из отдельного столбца
        if (isset($brand) && !empty($brand) && preg_match('/^[a-zа-яё\-\_\'\&]+\.?(\s?[a-zа-яё\-\_\'\(\)\&]+\.?)?$/ium', $brand)) {
            $param['brand'] = $brand;
        } else if (!isset($brand)) {
            $nomen = preg_replace(['/\s+/', '/^\s|\s$/m', '/^диск(\sстальной(\s\(штампованный\))?|\sлитой)?|^д\/(л|ст)|^(л|ст)\sдиск|а\/диск|ар?т?\.\d+|уцен\.?|(?<=\s)диск(?=\s)/imu', '/\s+/'], [' ', '', '', ' '], $nomen);
            $brand_search = explode(' ', $nomen);
            $pattern_brand = '/^[a-zа-яё\-\_\'\&]+\.?(\s?[a-zа-яё\-\_\'\(\)\&]+\.?)?$/ium';
            foreach ($brand_search as $position => $name) {
                if (preg_match($pattern_brand, $name) && !isset($param['brand'])) {
                    $param['brand'] = $name;
                    // Удаляем скобки
                    $param['brand'] = preg_replace('/\(|\)/', '', $param['brand']);
                    break;
                }
            }
        }

        $param['type'] = $type;

        // тело
        // Очищаем номенклатуру от лишних слов и пробелов
        $nomen = preg_replace(['/\s+/', '/^\s|\s$/m', '/^диск(\sстальной(\s\(штампованный\))?|\sлитой)?|^д\/(л|ст)|^(л|ст)\sдиск|а\/диск|ар?т?\.\d+|уцен\.?|(?<=\s)диск(?=\s)/imu', '/\s+/'], [' ', '', '', ' '], $nomen);

        // Если есть какие-то скобки, то временно их вырезать, потом вставить обратно
        if (preg_match('/\([^()]*\)/', $nomen, $result)) {
            $nomen = str_replace($result[0], '', $nomen);
        }

        while (!empty($nomen) && (
            !isset($param['brand']) ||
            !isset($param['all']) ||
            !isset($param['width']) ||
            !isset($param['drilling']) ||
            !isset($param['diametr']) ||
            !isset($param['departure']) ||
            !isset($param['dia']))) {

                // DIA
                if (!isset($param['dia']) && preg_match('/(?<!\w)([dD]|dia|DIA)\s?\d{2,3}[,\.]?\d?|(?<=[^eEеЕ][^tTтТ]\s)[4-9]\d[,\.]\d{1,2}(?=\s)|(?<=\s)1\d{2}[,\.]\d(?=\s)|(?<=\s)[4-9]\d[,\.]\d{1,2}$|(?<=\s)1\d{2}[,\.]\d$|(?<=\s)[4-9]\d$|(?<=\s)1\d{2}$|(?<=\/)[12]\d{2}[,\.]?\d?(?=[\s\/])|(?<=[^eEеЕ][^tTтТ]\s)[4-9]\d(?=\s)|(?<=[^lL][^sS]\s)1\d{2}(?=\s)|(?<=[^lL][^sS]\s)2\d{2}[,\.][50](?=\s)/mu', $nomen, $dia)) {
                    $nomen = str_replace($dia[0], '', $nomen);
                    preg_match('/\d{2,3}[,\.]?\d?/u', $dia[0], $value);
                    $param['dia'] = preg_replace(['/(?<=[,\.])0+/', '/(?<=[,\.]\d)0+/', '/,/', '/\.$/m'], ['', '', '.', ''], $value[0]);
                } else if (isset($param['dia'])) {

                } else {
                    $param['dia'] = '-';
                }

                // Сверловка
                if (!isset($param['drilling']) && preg_match('/(?<=[\s\/])\d[xXхХ\-\*]([3-9]\d|1\d{2})[,\.]?\d?|^\d[xXхХ\-\*]([3-9]\d|1\d{2})[,\.]?\d?|(?<=\s)(\d|1\d)\/\d{3}|^(\d|1\d)\/\d{3}|(?<=\s)(\d|[12]\d)[^\deEtT]+\d{3}[,\.]?[50]?(?=[\/])|^(\d|[12]\d)\D+\d{3}|(?<=\s)(\d|[12]\d)_отв[,\.](?=\s)|^(\d|1\d)\*\d{2,3}[,\.]?\d?(?=\s)|(?<=)(\d|1\d)\*\d{2,3}[,\.]?\d?$/mu', $nomen, $drilling)) {
                    $nomen = str_replace($drilling[0], '', $nomen);
                    $param['drilling'] = preg_replace('/\D{2,}|(?<=\d)[^,\.\d](?=\d)/u', '*', $drilling[0]);
                } else if (isset($param['drilling'])) {

                } else {
                    $param['drilling'] = '-';
                }

                // Вылет
                if (!isset($param['departure']) && preg_match('/(?<!\w)[EeЕе][TtТт][\s-]?\d{1,3}[,\.]?5?|(?<=\s\-)([2-5]\d|1\d{2})(?=\s)|(?<=[\/,])1\d{0,2}(?=\s)|(?<=\s)([2-5]\d|6[02])(?=\s)|(?<=\s)([2-5]\d|6[02])[,\.]5(?=\s)|(?<=[^lL][^sS]\s)([2-5]\d|6[02]|1\d{2})$|^([2-5]\d|6[02])(?=\s)|^([2-5]\d|6[02])[,\.]5(?=\s)|(?<=\s)d{2}(?=\s)/mu', $nomen, $departure)) {
                    $nomen = str_replace($departure[0], '', $nomen);
                    preg_match('/\d+[,\.]?\d*/u', $departure[0], $value);
                    $param['departure'] = preg_replace(['/(?<=[,\.])0+/', '/(?<=[,\.]\d)0+/', '/,/', '/\.$/m'], ['', '', '.', ''], $value[0]);
                } else if (isset($param['departure'])) {

                } else {
                    $param['departure'] = '-';
                }

                // Ширина и диаметр общие
                if (preg_match('/(?<=\s)[12]?\d[,\.]?\d?[50]?[xXхХ\-][12]\d[,\.]?[50]?(?=[\s\"\'\/])|^[12]?\d[,\.]?\d?[50]?[xXхХ\-][12]\d[,\.]?[50]?/mu', $nomen, $size)) {
                    $nomen = str_replace($size[0], '', $nomen);
                    $size_value = preg_split('/[xXхХ\*\-\/]/u', $size[0]);
                    $param['width'] = preg_replace(['/(?<=[,\.])0+$/m', '/(?<=[,\.]\d)0+$/m', '/,/', '/\.$/m'], ['', '', '.', ''], $size_value[0]);
                    $param['diametr'] = preg_replace(['/(?<=[,\.])0+$/m', '/(?<=[,\.]\d)0+$/m', '/,/', '/\.$/m'], ['', '', '.', ''], $size_value[1]);
                } else {
                    // Если ширина и диаметр записаны раздельно

                    // Ищем диаметр
                    if (!isset($param['diametr']) && preg_match('/(?<=\s)[rR\-][12]\d[,\.]?[50]?(?=\s)|^[rR\-]?[12]\d[,\.]?[50]?|[rR\-][12]\d[,\.]?[50]?$/mu', $nomen, $diametr)) {
                        $nomen = str_replace($diametr[0], '', $nomen);
                        preg_match('/[12]\d[,\.]?\d{0,2}C?/u', $diametr[0], $value);
                        $param['diametr'] = preg_replace(['/(?<=[,\.])0+/', '/(?<=[,\.]\d)0+/', '/,/', '/\.$/m'], ['', '', '.', ''], $value[0]);
                    } else {
                        $param['diametr'] = '-';
                    }

                    // Ищем ширину
                    if (!isset($param['width']) && preg_match('/(?<=\s)([jJ]?[5-9]|[jJ]?1[0-2468-9]|[jJ]?1[0-2468-9][,\.][50]|[jJ]?[4-9][,\.][50]|[jJ]?[5-9][,\.]\d[50])(?=\s)|^([jJ]?[5-9]|[jJ]?1[0-2468-9]|[jJ]?1[0-2468-9][,\.][50]|[jJ]?[5-9][,\.][50]|[jJ]?[5-9][,\.]\d[50])(?=\s)|(?<=\s)([jJ]?[5-9]|[jJ]?1[0-2468-9]|[jJ]?1[0-2468-9][,\.][50]|[jJ]?[5-9][,\.][50]|[jJ]?[5-9][,\.]\d[50])$/mu', $nomen, $width)) {
                        $nomen = str_replace($width[0], '', $nomen);
                        preg_match('/1?\d[,\.]?\d{0,2}/u', $width[0], $value);
                        $param['width'] = preg_replace(['/(?<=[,\.])0+/', '/(?<=[,\.]\d)0+/', '/,/', '/\.$/m'], ['', '', '.', ''], $value[0]);
                    } else {
                        $param['width'] = '-';
                    }
                }

                // Очищаем лишние пробелы и одиночные символы
                $nomen = trim(preg_replace(['/(?<=\s)[^a-z0-9а-яё\+]+(?=\s)/iu', '/\s{2,}/'], ['', ' '], $nomen));

                if (!isset($param['brand'])) {
                    $param['brand'] = '-';
                } else {
                    $nomen = preg_replace(['/' . $param['brand'] . '/iu', '/\s+|\(\)|\_+/', '/^\s?[^\wа-яё\(]/ium'], ['', ' ', ''], $nomen);
                    $param['brand'] = str_replace('_', ' ', $param['brand']);
                    if (!empty($nomen)) {
                        if (!empty($result)) {
                            $param['all'] = $nomen . ' ' .$result[0];
                        } else {
                            $param['all'] = $nomen;
                        }
                    } else {
                        $param['all'] = '-';
                    }
                }
                if (!isset($param['all'])) {
                    if (!empty($result)) {
                        $param['all'] = trim($nomen) . ' ' .$result[0];
                    } else {
                        $param['all'] = trim($nomen);
                    }

                } else {

                }

            }

        return $param;
        // ===========//



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

    // Парсинг дисков для прайсов без номенклатуры
    public function diskParse($start_row, $list, $column) {

        //dump('столбцы', $column);

        $params = [];

        $list_count = count($list);     // Узнаем количество строк в листе

        for ($i = $start_row; $i < $list_count; $i++) {
            //dd($list[$start_row]);

            if (isset($column['brand_col'])) {
                if (!empty(trim($list[$i][$column['brand_col']]))) {
                    $params[$i - $start_row]['brand'] = $list[$i][$column['brand_col']];
                } else {
                    $params[$i - $start_row]['brand'] = '-';
                }
            }

            if (isset($column['model_col'])) {
                if (!empty(trim($list[$i][$column['model_col']]))) {
                    $params[$i - $start_row]['all'] = $list[$i][$column['model_col']];
                } else {
                    $params[$i - $start_row]['all'] = '-';
                }
            }

            if (isset($column['width_col'])) {
                if (!empty(trim($list[$i][$column['width_col']]))) {
                    $params[$i - $start_row]['width'] = $list[$i][$column['width_col']];
                } else {
                    $params[$i - $start_row]['width'] = '-';
                }
            }

            if (isset($column['diameter_col'])) {
                if (!empty(trim($list[$i][$column['diameter_col']]))) {
                    $params[$i - $start_row]['diametr'] = preg_replace('/r/iu', '' ,$list[$i][$column['diameter_col']]);
                } else {
                    $params[$i - $start_row]['diametr'] = '-';
                }
            }

            if (isset($column['departure_col'])) {
                if (!empty(trim($list[$i][$column['departure_col']]))) {
                    $params[$i - $start_row]['departure'] = $list[$i][$column['departure_col']];
                } else {
                    $params[$i - $start_row]['departure'] = '-';
                }
            }

            if (isset($column['dia_col'])) {
                if (!empty(trim($list[$i][$column['dia_col']]))) {
                    $params[$i - $start_row]['dia'] = $list[$i][$column['dia_col']];
                } else {
                    $params[$i - $start_row]['dia'] = '-';
                }
            }

            if (isset($column['drilling_col']) && !empty(trim($list[$i][$column['drilling_col']]))) {
                $params[$i - $start_row]['drilling'] = $list[$i][$column['drilling_col']];
            } else if (isset($column['drilling_col']) && empty(trim($list[$i][$column['drilling_col']]))) {
                $params[$i - $start_row]['drilling'] = '-';
            } else {
                $params[$i - $start_row]['drilling'] = $list[$i][$column['hole_col']] . '*' . $list[$i][$column['s_hole_col']];
            }


            // Если массив брендом пустой и текущий бренд не пустая строка и не равна "-", то заносим в массив текущий бренд
            if (!isset($brands) && !empty($params[$i - $start_row]['brand']) && $params[$i - $start_row]['brand'] !== '-') {
                $brands[] = $params[$i - $start_row]['brand'];
                // Если массив брендов уже есть и текущий бренд еще не существует в массиве то заносим его
            } else if (isset($brands) && !in_array($params[$i - $start_row]['brand'], $brands) && !empty($params[$i - $start_row]['brand']) && $params[$i - $start_row]['brand'] !== '-') {
                $brands[] = $params[$i - $start_row]['brand'];
            } else {
                continue;
            }
        }
        //dd($brands);        // Массив найденных брендов в прайсе
        $params['brands'] = $brands;
        //dump($params);
        //dd($params);

        return $params;

    }

    // Парсинг шин для прайсов без номенклатуры
    public function shinParse($start_row, $list, $column) {

        //dump('столбцы', $column);

        $params = [];

        $list_count = count($list);     // Узнаем количество строк в листе

        for ($i = $start_row; $i < $list_count; $i++) {

            if (isset($column['brand_col'])) {
                if (!empty(trim($list[$i][$column['brand_col']]))) {
                    $params[$i - $start_row]['brand'] = $list[$i][$column['brand_col']];
                } else {
                    $params[$i - $start_row]['brand'] = '-';
                }
            }

            if (isset($column['model_col'])) {
                if (!empty(trim($list[$i][$column['model_col']]))) {
                    $params[$i - $start_row]['all'] = $list[$i][$column['model_col']];
                } else {
                    $params[$i - $start_row]['all'] = '-';
                }
            }

            if (isset($column['width_col'])) {
                if (!empty(trim($list[$i][$column['width_col']]))) {
                    $params[$i - $start_row]['width'] = $list[$i][$column['width_col']];
                } else {
                    $params[$i - $start_row]['width'] = '-';
                }
            }

            if (isset($column['height_col'])) {
                if (!empty(trim($list[$i][$column['height_col']]))) {
                    $params[$i - $start_row]['height'] = $list[$i][$column['height_col']];
                } else {
                    $params[$i - $start_row]['height'] = '-';
                }
            }

            if (isset($column['diameter_col'])) {
                if (!empty(trim($list[$i][$column['diameter_col']]))) {
                    $params[$i - $start_row]['radius'] = preg_replace('/r/iu', '' ,$list[$i][$column['diameter_col']]);
                } else {
                    $params[$i - $start_row]['radius'] = '-';
                }
            }

            if (isset($column['index_speed_col'])) {
                if (!empty(trim($list[$i][$column['index_speed_col']]))) {
                    $params[$i - $start_row]['index_speed'] = $list[$i][$column['index_speed_col']];
                } else {
                    $params[$i - $start_row]['index_speed'] = '-';
                }
            }

            if (isset($column['index_load_col'])) {
                if (!empty(trim($list[$i][$column['index_load_col']]))) {
                    $params[$i - $start_row]['index_load'] = $list[$i][$column['index_load_col']];
                } else {
                    $params[$i - $start_row]['index_load'] = '-';
                }
            }

            // индекс общий без ном
            if (isset($column['index_col']) && !empty(trim($list[$i][$column['index_col']]))) {
                $index = $list[$i][$column['index_col']];
                preg_match('/\d{1,3}\/?\d{0,3}/u', $index, $value_load);
                preg_match('/[АA-ZТМНК][1-7]?/u', $index, $value_speed);
                $params[$i - $start_row]['index_load'] = $value_load[0];
                $params[$i - $start_row]['index_speed'] = $value_speed[0];
            } else if (!isset($column['index_col']) && !isset($column['index_load_col']) && !isset($column['index_load_col'])) {
                $params[$i - $start_row]['index_load'] = '-';
                $params[$i - $start_row]['index_speed'] = '-';
            }


            // Если массив брендом пустой и текущий бренд не пустая строка и не равна "-", то заносим в массив текущий бренд
            if (!isset($brands) && !empty($params[$i - $start_row]['brand']) && $params[$i - $start_row]['brand'] !== '-') {
                $brands[] = $params[$i - $start_row]['brand'];
                // Если массив брендов уже есть и текущий бренд еще не существует в массиве то заносим его
            } else if (isset($brands) && !in_array($params[$i - $start_row]['brand'], $brands) && !empty($params[$i - $start_row]['brand']) && $params[$i - $start_row]['brand'] !== '-') {
                $brands[] = $params[$i - $start_row]['brand'];
            } else {
                continue;
            }
        }
        //dd($brands);        // Массив найденных брендов в прайсе
        $params['brands'] = $brands;
        //dump($params);
        //dd($params);

        return $params;

    }

    //Для парсинга с сайтов (Пока не использовать)
    public function testParse(Request $request)
    {
        $data = $request->except('_token');

        $parser = new Parser('123');
        $data = $parser->parseProduct($data);

        return response()->json($data);
    }
    //Добавление после прайсинга (Пока не использовать)
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

}
