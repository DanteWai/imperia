<?php

namespace App\Http\Controllers;

use App\Models\Main_menu;
use App\Models\Product_category;
use App\Repositories\CategoriesRepository;
use App\Repositories\MenusRepository;
use App\Repositories\OrdersRepository;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class CatalogController extends SiteController
{
    //


    public function __construct()
    {
        parent::__construct(new MenusRepository(new Main_menu), new CategoriesRepository(new Product_category()));

        $this->template=env('THEME').'.catalog.catalog';

    }

    /**
     * @param Request $request
     * @return IndexController
     * @throws \Throwable
     */
    public function Index(Request $request) {

        $brands =  $this->b_rep->getBrands(['brand_id','brand_name','brand_logo','brand_desc'])->load(['options'=>function($query) {
           $query->select('options->season as season');
        }]);


        $params = $this->getUniqueParamsForCategory('1',$brands);

        $filter = [
            'brand' => $params['brand'],
        ];

        $list = view(env('THEME').'.catalog.category_list')->with('brands',$brands)->render();
        $option_panel = view(env('THEME').'.catalog.optionForShin')->with('params',$params)->render();
        $filter_panel = view(env('THEME').'.catalog.filter_panel')->with('filter',$filter)->render();

        /**/

        /*$products = $this->o_rep->getParamOption(['category_id'=>1],false);
        $list = view(env('THEME').'.catalog.product_list')->with(['products'=>$products,'pagesCount'=>ceil(count($products)/20)])->render();

        /**/


        $content = view(env('THEME').'.catalog.mainContent')->with([
            'params'=>$params,
            'list'=>$list,
            'categories'=>$this->getCategories(),
            'option_panel' => $option_panel,
            'filter_panel' => $filter_panel,
        ])->render();

        $this->vars = Arr::add($this->vars,'content',$content);

        $basket = view('basket')->render();
        $this->vars = Arr::add($this->vars,'basket',$basket);


        return $this->renderOutput();
    }

    public function productPage($model, $id){

        $product = $this->o_rep->getProduct($id);
        $analogProduct = $this->o_rep->getAnalog($product,5);
        $content = view('catalog.mainProductPage',compact('product','analogProduct'))->render();
        $this->vars = Arr::add($this->vars,'content',$content);

        $basket = view('basket')->render();
        $this->vars = Arr::add($this->vars,'basket',$basket);


        return $this->renderOutput();
    }

    public function checkout(){ // страница оформления заказа

        $content = view('catalog.checkout')->render();
        $this->vars = Arr::add($this->vars,'content',$content);


        return $this->renderOutput();
    }

    public function checkout_output(Request $request, OrdersRepository $order_rep){ //добавление заказа

        $data = $request->except('_token','image');
        $this->order_rep = $order_rep;
        $result = $this->order_rep->addOrder($data);
        return response()->json($result);

    }

    public function switchCategory(Request $request) { // формирует html для отображения к другой категории

        $post['name'] = $request->category_id;

        if ($post['name'] == '2') {
            $brands = $this->b_rep->getBrands('*',$post['name']);
            $option_view = 'catalog.optionForDisk';
        }

        else {
            $brands = $this->b_rep->getBrands('*',$post['name'])
                ->load(['options'=>function($query) {
                    $query->select('options->season as season');
                }]);
            $option_view = 'catalog.optionForShin';
        }

        $params = $this->getUniqueParamsForCategory($post['name'],$brands);
        $filter = ['brand'=>$params['brand']];
        $list = view('catalog.category_list')->with(['brands'=>$brands,'season'=> $post['name'] == '1'])->render();
        $option_panel = view($option_view)->with('params',$params)->render();
        $filter_panel = view(env('THEME').'.catalog.filter_panel')->with('filter',$filter)->render();

        $data = [
            'list' => $list,
            'option_panel' => $option_panel,
            'filter_panel' =>$filter_panel,
        ];

        return response()->json($data);
    }

    public function productList(Request $request) { // Фоормирует список товаров для каталога
        $post = $request->all();

        if(isset($post['products']) && isset($post['options'])){
            $products = $this->o_rep->getParamOption($post['products'],$post['options'], false, $post['page']);
            return response()->json($products);
        }
        return response()->json(['error'=>"не удалось получить товары"]);
    }



    public function basketList(Request $request) { // Формирует список товаров в корзине

        $post = $request->all();
        $options = array_keys($post);
        $products = $this->o_rep->getProducts($options);

        $outputProducts = [];

        foreach($products as $key => $product){
            $outputProducts[$key]['option_id']=$product['option_id'];
            $outputProducts[$key]['count']=$post[$product['option_id']];
            $outputProducts[$key]['price']=$product['price'];
            $outputProducts[$key]['brand']=$product['product']['brand']['brand_name'];
            $outputProducts[$key]['model']=$product['product']['product_model'];
            $outputProducts[$key]['image']=$product['product']['product_images'];
            $outputProducts[$key]['options']=$product['options'];
        }
        return response()->json($outputProducts);
    }




}
