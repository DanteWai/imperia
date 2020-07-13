<?php

namespace App\Http\Controllers;

use App\Models\Main_menu;
use App\Models\Product_category;
use App\Repositories\CategoriesRepository;
use App\Repositories\MenusRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PageController extends SiteController
{
    //
    public function __construct()
    {
        parent::__construct(new MenusRepository(new Main_menu), new CategoriesRepository(new Product_category()));

        $this->template='index';

    }


    public function Index($page) {

        $this->title = 'Вестник';
        $page = $this->page_rep->getPage($page);
        $content = view('pageContent', compact('page'))->render();
        $this->vars = Arr::add($this->vars,'content',$content);
        return $this->renderOutput();
    }
}
