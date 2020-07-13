<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use App\Repositories\OrdersRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;


use App\Models\Product_category;
use App\Models\Product_option;
use App\Models\Product_brand;
use App\Models\Product;
use App\Models\Parser;
use App\Models\Page;



use App\Repositories\CategoriesRepository;
use App\Repositories\OptionsRepository;
use App\Repositories\ProductsRepository;
use App\Repositories\BrandsRepository;
use App\Repositories\ParsersRepository;
use App\Repositories\PagesRepository;

use Menu;

class AdminController extends \App\Http\Controllers\Controller
{
    //
    protected $o_rep;
    protected $order_rep;
    protected $p_rep;
    protected $b_rep;
    protected $c_rep;
    protected $pars_rep;
    protected $page_rep;


    protected $user;

    protected $template;

    protected $content = FALSE;

    protected $title;

    protected $vars;

    protected $admin_url;

    public function __construct() {

        $this->c_rep =  new CategoriesRepository(new Product_category());;
        $this->o_rep =  new OptionsRepository(new Product_option());

        $this->p_rep =  new ProductsRepository(new Product());
        $this->b_rep =  new BrandsRepository(new Product_brand());
        $this->pars_rep =  new ParsersRepository(new Parser());
        $this->page_rep =  new PagesRepository(new Page());
        $this->admin_url = 'imperia_admin_panel';

       /* $this->user = Auth::user();

        if(!$this->user) {
            abort(403);
        }*/
    }

    public function renderOutput() {
        $this->vars = Arr::add($this->vars,'title',$this->title);

        $menu = $this->getMenu();


        $navigation = view(env('THEME').'.admin.navigation')->with('menu',$menu)->render();
        $this->vars = Arr::add($this->vars,'navigation',$navigation);


        if($this->content) {
            $this->vars =  Arr::add($this->vars,'content',$this->content);
        }

        /*$footer = view(env('THEME').'.admin.footer')->render();
        $this->vars = array_add($this->vars,'footer',$footer);*/

        return view($this->template)->with($this->vars);

//
    }

    public function getMenu() {
        return Menu::make('adminMenu', function($menu) {
            $menu->add('Главная',array('route' => 'admin'))->prepend(
                '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8333 10.8333H14.3333V14.3333H10.8333V10.8333ZM5.58333 10.8333H9.08333V14.3333H5.58333V10.8333ZM0.333334 10.8333H3.83333V14.3333H0.333334V10.8333ZM10.8333 5.58334H14.3333V9.08334H10.8333V5.58334ZM5.58333 5.58334H9.08333V9.08334H5.58333V5.58334ZM0.333334 5.58334H3.83333V9.08334H0.333334V5.58334ZM10.8333 0.333336H14.3333V3.83334H10.8333V0.333336ZM5.58333 0.333336H9.08333V3.83334H5.58333V0.333336ZM0.333334 0.333336H3.83333V3.83334H0.333334V0.333336Z"/>
                </svg>');
            $menu->add('Заказы',  array('route'  => 'admin'))->prepend('
                <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.83333 12.3333H10.8333C11.0654 12.3333 11.288 12.4211 11.4521 12.5774C11.6161 12.7337 11.7083 12.9457 11.7083 13.1667C11.7083 13.3877 11.6161 13.5996 11.4521 13.7559C11.288 13.9122 11.0654 14 10.8333 14H2.95833C2.72627 14 2.50371 13.9122 2.33962 13.7559C2.17552 13.5996 2.08333 13.3877 2.08333 13.1667V2.33334H1.20833C0.97627 2.33334 0.75371 2.24554 0.589616 2.08926C0.425521 1.93298 0.333334 1.72102 0.333334 1.50001C0.333334 1.27899 0.425521 1.06703 0.589616 0.910749C0.75371 0.754469 0.97627 0.666672 1.20833 0.666672H2.95833C3.1904 0.666672 3.41296 0.754469 3.57705 0.910749C3.74115 1.06703 3.83333 1.27899 3.83333 1.50001V9.00001H11.5115L12.5833 4.83334V3.16751C13.5852 3.16751 14.3333 3.91251 14.3333 4.83334C14.3333 4.95501 14.3185 5.07584 14.2896 5.19501L13.2825 9.36167C13.0987 10.1242 12.362 10.6667 11.5115 10.6667H3.89721L3.83333 10.6658V12.3333ZM3.39583 17.3333C3.04774 17.3333 2.7139 17.2016 2.46776 16.9672C2.22161 16.7328 2.08333 16.4149 2.08333 16.0833C2.08333 15.7518 2.22161 15.4339 2.46776 15.1995C2.7139 14.965 3.04774 14.8333 3.39583 14.8333C3.74393 14.8333 4.07777 14.965 4.32391 15.1995C4.57005 15.4339 4.70833 15.7518 4.70833 16.0833C4.70833 16.4149 4.57005 16.7328 4.32391 16.9672C4.07777 17.2016 3.74393 17.3333 3.39583 17.3333V17.3333ZM11.2708 17.3333C10.9227 17.3333 10.5889 17.2016 10.3428 16.9672C10.0966 16.7328 9.95833 16.4149 9.95833 16.0833C9.95833 15.7518 10.0966 15.4339 10.3428 15.1995C10.5889 14.965 10.9227 14.8333 11.2708 14.8333C11.6189 14.8333 11.9528 14.965 12.1989 15.1995C12.4451 15.4339 12.5833 15.7518 12.5833 16.0833C12.5833 16.4149 12.4451 16.7328 12.1989 16.9672C11.9528 17.2016 11.6189 17.3333 11.2708 17.3333ZM9.08333 3.16667H9.95833C10.1904 3.16667 10.413 3.25447 10.5771 3.41075C10.7411 3.56703 10.8333 3.77899 10.8333 4.00001C10.8333 4.22102 10.7411 4.43298 10.5771 4.58926C10.413 4.74554 10.1904 4.83334 9.95833 4.83334H9.08333V5.66667C9.08333 5.88769 8.99115 6.09965 8.82705 6.25593C8.66296 6.41221 8.4404 6.50001 8.20833 6.50001C7.97627 6.50001 7.75371 6.41221 7.58962 6.25593C7.42552 6.09965 7.33333 5.88769 7.33333 5.66667V4.83334H6.45833C6.22627 4.83334 6.00371 4.74554 5.83962 4.58926C5.67552 4.43298 5.58333 4.22102 5.58333 4.00001C5.58333 3.77899 5.67552 3.56703 5.83962 3.41075C6.00371 3.25447 6.22627 3.16667 6.45833 3.16667H7.33333V2.33334C7.33333 2.11232 7.42552 1.90036 7.58962 1.74408C7.75371 1.5878 7.97627 1.50001 8.20833 1.50001C8.4404 1.50001 8.66296 1.5878 8.82705 1.74408C8.99115 1.90036 9.08333 2.11232 9.08333 2.33334V3.16667Z"/>
                </svg>');
            $menu->add('Прайс листы',  array('route'  => 'p_lists'))->prepend('
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70833 9.25H13.4583C13.6904 9.25 13.913 9.34219 14.0771 9.50628C14.2411 9.67038 14.3333 9.89294 14.3333 10.125C14.3333 10.3571 14.2411 10.5796 14.0771 10.7437C13.913 10.9078 13.6904 11 13.4583 11H4.70833C4.47627 11 4.25371 10.9078 4.08962 10.7437C3.92552 10.5796 3.83333 10.3571 3.83333 10.125C3.83333 9.89294 3.92552 9.67038 4.08962 9.50628C4.25371 9.34219 4.47627 9.25 4.70833 9.25V9.25ZM4.70833 12.75H13.4583C13.6904 12.75 13.913 12.8422 14.0771 13.0063C14.2411 13.1704 14.3333 13.3929 14.3333 13.625C14.3333 13.8571 14.2411 14.0796 14.0771 14.2437C13.913 14.4078 13.6904 14.5 13.4583 14.5H4.70833C4.47627 14.5 4.25371 14.4078 4.08962 14.2437C3.92552 14.0796 3.83333 13.8571 3.83333 13.625C3.83333 13.3929 3.92552 13.1704 4.08962 13.0063C4.25371 12.8422 4.47627 12.75 4.70833 12.75V12.75ZM9.95833 5.75H13.4583C13.6904 5.75 13.913 5.84219 14.0771 6.00628C14.2411 6.17038 14.3333 6.39294 14.3333 6.625C14.3333 6.85707 14.2411 7.07962 14.0771 7.24372C13.913 7.40781 13.6904 7.5 13.4583 7.5H9.95833C9.72627 7.5 9.50371 7.40781 9.33962 7.24372C9.17552 7.07962 9.08333 6.85707 9.08333 6.625C9.08333 6.39294 9.17552 6.17038 9.33962 6.00628C9.50371 5.84219 9.72627 5.75 9.95833 5.75V5.75ZM3.60846 7.42475L0.333334 4.1505L1.57058 2.91238L3.60846 4.95025L8.05783 0.5L9.29596 1.73725L3.60846 7.42475V7.42475Z"/>
                </svg>');
            $menu->add('Парсеры',  array('route'  => 'parsers.index'))->prepend('
                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9325 4.87783V3.98425C10.9325 3.90233 10.8654 3.83532 10.7835 3.83532H3.63486C3.55295 3.83532 3.48593 3.90233 3.48593 3.98425V4.87783C3.48593 4.95974 3.55295 5.02676 3.63486 5.02676H10.7835C10.8654 5.02676 10.9325 4.95974 10.9325 4.87783ZM3.63486 6.51607C3.55295 6.51607 3.48593 6.58309 3.48593 6.665V7.55858C3.48593 7.64049 3.55295 7.70751 3.63486 7.70751H7.06027C7.14218 7.70751 7.2092 7.64049 7.2092 7.55858V6.665C7.2092 6.58309 7.14218 6.51607 7.06027 6.51607H3.63486ZM6.31562 14.9307H1.99663V1.82475H12.4218V8.22877C12.4218 8.31068 12.4888 8.3777 12.5707 8.3777H13.6132C13.6951 8.3777 13.7621 8.31068 13.7621 8.22877V1.0801C13.7621 0.750589 13.4959 0.484375 13.1664 0.484375H1.25197C0.922464 0.484375 0.65625 0.750589 0.65625 1.0801V15.6753C0.65625 16.0048 0.922464 16.271 1.25197 16.271H6.31562C6.39753 16.271 6.46455 16.204 6.46455 16.1221V15.0796C6.46455 14.9977 6.39753 14.9307 6.31562 14.9307ZM14.6129 15.8894L12.876 14.1525C13.2912 13.6033 13.5388 12.9182 13.5388 12.1754C13.5388 10.3659 12.0718 8.89896 10.2623 8.89896C8.45277 8.89896 6.9858 10.3659 6.9858 12.1754C6.9858 13.9849 8.45277 15.4519 10.2623 15.4519C10.9287 15.4519 11.5468 15.2527 12.0643 14.912L13.8273 16.675C13.8571 16.7048 13.8943 16.7178 13.9316 16.7178C13.9688 16.7178 14.0079 16.7029 14.0358 16.675L14.6129 16.0979C14.6266 16.0842 14.6375 16.068 14.645 16.0501C14.6524 16.0322 14.6562 16.013 14.6562 15.9936C14.6562 15.9743 14.6524 15.9551 14.645 15.9372C14.6375 15.9193 14.6266 15.9031 14.6129 15.8894V15.8894ZM10.2623 14.2605C9.10993 14.2605 8.17725 13.3278 8.17725 12.1754C8.17725 11.0231 9.10993 10.0904 10.2623 10.0904C11.4146 10.0904 12.3473 11.0231 12.3473 12.1754C12.3473 13.3278 11.4146 14.2605 10.2623 14.2605Z"/>
                </svg>');
            $menu->add('Настройки',  array('route'  => 'update'))->prepend('
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.577 7.90186C12.604 7.67687 12.622 7.44287 12.622 7.19987C12.622 6.95688 12.604 6.72288 12.568 6.49788L14.089 5.3099C14.1542 5.25524 14.1988 5.17985 14.2151 5.09632C14.2315 5.01279 14.2188 4.92617 14.179 4.85091L12.739 2.35795C12.649 2.19596 12.46 2.14196 12.298 2.19596L10.507 2.91594C10.1351 2.62886 9.72652 2.39277 9.29206 2.21396L9.02206 0.305987C9.00904 0.220146 8.96544 0.141901 8.89929 0.0856698C8.83313 0.0294389 8.74889 -0.000988971 8.66207 -7.49434e-06H5.78212C5.69628 -0.000878583 5.61311 0.0298042 5.5484 0.0862141C5.4837 0.142624 5.44196 0.220833 5.43112 0.305987L5.16113 2.21396C4.7274 2.39426 4.31897 2.63024 3.94615 2.91594L2.15518 2.19596C2.07453 2.16486 1.98532 2.16415 1.90419 2.19396C1.82306 2.22376 1.75553 2.28205 1.71418 2.35795L0.274207 4.85091C0.229673 4.92497 0.214223 5.01293 0.230851 5.09773C0.247479 5.18254 0.295001 5.25815 0.364206 5.3099L1.88518 6.49788C1.84918 6.72288 1.82218 6.96588 1.82218 7.19987C1.82218 7.43387 1.84018 7.67687 1.87618 7.90186L0.355206 9.08984C0.289954 9.1445 0.245422 9.21989 0.229043 9.30342C0.212665 9.38696 0.225429 9.47358 0.265207 9.54883L1.70518 12.0418C1.79518 12.2038 1.98418 12.2578 2.14618 12.2038L3.93715 11.4838C4.30905 11.7709 4.71766 12.007 5.15213 12.1858L5.42212 14.0938C5.45812 14.2738 5.60212 14.3998 5.78212 14.3998H8.66207C8.84206 14.3998 8.99506 14.2738 9.01306 14.0938L9.28306 12.1858C9.71679 12.0055 10.1252 11.7695 10.498 11.4838L12.289 12.2038C12.451 12.2668 12.64 12.2038 12.73 12.0418L14.17 9.54883C14.2145 9.47477 14.23 9.38682 14.2133 9.30201C14.1967 9.21721 14.1492 9.1416 14.08 9.08984L12.577 7.90186ZM7.22209 9.89983C5.73712 9.89983 4.52214 8.68485 4.52214 7.19987C4.52214 5.7149 5.73712 4.49992 7.22209 4.49992C8.70707 4.49992 9.92205 5.7149 9.92205 7.19987C9.92205 8.68485 8.70707 9.89983 7.22209 9.89983Z"/>
                </svg>');
        });
    }

    public function headContent($mass){
        return view('admin.layers.contentTopIndex')->with($mass)->render();
    }
}
