<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Product_brand;
use Illuminate\Http\Request;
use App\Models\Main_menu;
use App\Models\Product_category;
use App\Repositories\MenusRepository;
use App\Repositories\CategoriesRepository;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Mail;
use PhpParser\Node\Expr\Array_;

class IndexController extends SiteController
{
    //
    public function __construct()
    {
        parent::__construct(new MenusRepository(new Main_menu), new CategoriesRepository(new Product_category()));

        $this->template='index';

    }

    /**
     * @return IndexController
     * @throws \Throwable
     */
    public function Index() {

        $brands = $this->b_rep->getBrands(['brand_id','brand_name']);


        $width = Arr::flatten($this->o_rep->getUniqueOption(['options->width as width'],'options->width')->toArray());
        $height = Arr::flatten($this->o_rep->getUniqueOption(['options->height as height'],'options->height')->toArray());
        $diameter = Arr::flatten($this->o_rep->getUniqueOption(['options->diameter as diameter'],'options->diameter')->toArray());
        $brandsName = $brands->map(function($item, $key) {
            return [$item->brand_id,$item->brand_name];
        })->toArray();


        $params = [
            'width' => $width,
            'height' => $height,
            'diameter' => $diameter,
            'brand' =>  $brandsName,
        ];


        $content = view('mainContent')->with('params',$params)->render();

        $this->vars = Arr::add($this->vars,'content',$content);


        return $this->renderOutput();
    }

    public function changeContent(Request $request) {
        $params = $this->getUniqueParamsForCategory($request->category_id);
        $content = view('mainPage.mainContentChoiceList')->with('params',$params)->render();
        return response()->json($content);
    }

    public function paramList(Request $request){


        $post = $request->all();
        //$post['params'] = ['brand_id'];

        if(isset($post['products']) && isset($post['options'])) {
            $products = $this->o_rep->getUniqueParam($post['products'], $post['options'], $post['params']);
            return response()->json($products);
        }

        return response()->json(['error'=>'Ошибка получения параметров']);


    }
}
