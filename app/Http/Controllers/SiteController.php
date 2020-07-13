<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Product_option;
use App\Models\Product_brand;
use App\Models\Product;
use App\Repositories\PagesRepository;
use Illuminate\Http\Request;

use App\Repositories\MenusRepository;
use App\Repositories\CategoriesRepository;
use App\Repositories\OptionsRepository;
use App\Repositories\ProductsRepository;
use App\Repositories\BrandsRepository;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Menu;


class SiteController extends Controller
{
    //
    protected $m_rep;
    protected $c_rep;
    protected $o_rep;
    protected $p_rep;
    protected $b_rep;
    protected $page_rep;

    protected $order_rep;

    protected $template;

    protected $vars = [];

    protected $categories;
    protected $brands;
    protected $options;
    protected $products;




    public function __construct(MenusRepository $m_rep, CategoriesRepository $c_rep)
    {
        $this->m_rep = $m_rep;
        $this->c_rep = $c_rep;

        $this->o_rep =  new OptionsRepository(new Product_option());
        $this->p_rep =  new ProductsRepository(new Product());
        $this->b_rep =  new BrandsRepository(new Product_brand());
        $this->page_rep =  new PagesRepository(new Page());

        //$this->brands = $this->b_rep->getBrands('*');

        //$this->categories = $this->getCategories();
    }

    protected function renderOutput(){

        $menu = $this->getMenu();

        $nav = view('nav')->with([
            'menu'=>$menu,
            'categories' => $this->categories,
        ])->render();

        $footer = view('footer')->render();


        $this->vars = Arr::add($this->vars, 'nav',$nav);
        $this->vars = Arr::add($this->vars, 'footer',$footer);

        return view($this->template)->with($this->vars);
    }

    public function getMenu()
    {
        $menu = $this->m_rep->get();

        $mBuilder = Menu::make('MyNav', function($m) use($menu) {
            foreach($menu as $item) {
                if($item->parent_id == 0) {
                    $m->add($item->menu_name,$item->path)->id($item->id);
                }
                else {
                    if($m->find($item->parent_id)) {
                        $m->find($item->parent_id)->add($item->menu_name,$item->path)->id($item->id);
                    }
                }
            }
        });

        return $mBuilder;
    }

    public function getCategories() {
        $categories = $this->c_rep->get(['category_id','category_name', 'category_alias','parent_id','category_options']);
        return $categories;
    }


    public function getUniqueParamsForCategory($category, $brands=false){

        if($category === "1" || $category === 1){
            $width = Arr::flatten($this->o_rep->getUniqueOption(['options->width as width'],'options->width')->toArray());
            $height = Arr::flatten($this->o_rep->getUniqueOption(['options->height as height'],'options->height')->toArray());
            $diameter = Arr::flatten($this->o_rep->getUniqueOption(['options->diameter as diameter'],'options->diameter')->toArray());

            if(!$brands){
                $brands = $this->b_rep->getBrands(['brand_id','brand_name'],$category);
            }
            $brandsName = $brands->map(function($item, $key) {
                return ['brand_id'=>$item->brand_id,'brand_name'=>$item->brand_name];
            })->toArray();


            $params = [
                'width' => $width,
                'height' => $height,
                'diameter' => $diameter,
                'brand' => $brandsName,
            ];
        }
            else if($category === "2" || $category === 2){

                $width = Arr::flatten($this->o_rep->getUniqueOption(['options->width as width'],'options->width')->toArray());
                $diameter = Arr::flatten($this->o_rep->getUniqueOption(['options->diameter as diameter'],'options->diameter')->toArray());
                $mount = Arr::flatten($this->o_rep->getUniqueOption(['options->mount as mount'],'options->mount')->toArray());
                $departure = Arr::flatten($this->o_rep->getUniqueOption(['options->departure as departure'],'options->departure')->toArray());
                $dia = Arr::flatten($this->o_rep->getUniqueOption(['options->dia as dia'],'options->dia')->toArray());

                if(!$brands){
                    $brands = $this->b_rep->getBrands(['brand_id','brand_name'],$category);
                }

                $brandsName = $brands->map(function($item, $key) {
                    return ['brand_id'=>$item->brand_id,'brand_name'=>$item->brand_name];
                })->toArray();


                $params = [
                    'width' => $width,
                    'diameter' => $diameter,
                    'mount' => $mount,
                    'departure' => $departure,
                    'dia' => $dia,
                    'brand' => $brandsName,
                ];




            }

        return $params;
    }
}
