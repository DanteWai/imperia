<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Главная*/
Route::get('/','IndexController@index')->name('home');
Route::post('/praramlist','IndexController@paramList');
Route::post('/newPraramlist','IndexController@changeContent');


/*Каталог*/
Route::get('/catalog','CatalogController@index')->name('catalog');
Route::get('/catalog/checkout','CatalogController@checkout')->name('checkout');
Route::post('/catalog/checkout','CatalogController@checkout_output')->name('checkout_output');
Route::get('catalog/{model}/{id}', 'CatalogController@productPage')->name('productPage');


//json
Route::post('/catalog/switch','CatalogController@switchCategory')->name('switchCategory'); //отрендеренный html для смены категории
Route::post('/catalog/list','CatalogController@productList')->name('productList'); //json с товарами с учетом параметров
Route::post('/catalog/basket','CatalogController@basketList')->name('basket');


Route::post('/send_mail',['uses'=>'EmailController@footerMessages'])->name('footerMessages');

/*Админка*/


Route::group(['prefix'=>env('APP_ADMIN_URL', 'imperia_admin_panel')], function(){
    Route::get('/',['uses'=>'Admin\IndexController@index'])->name('admin');

    Route::get('/products/{category}',['uses'=>'Admin\ProductsController@index'])->name('products');
    Route::get('/product/add',['uses'=>'Admin\ProductsController@create'])->name('productAdd');
    Route::post('/product/add',['uses'=>'Admin\ProductsController@store'])->name('productStore');
    Route::post('/product/add/{product}',['uses'=>'Admin\ProductsController@update'])->name('product_update');
    Route::post('/product/edit/{product}',['uses'=>'Admin\ProductsController@edit'])->name('product_edit');
    Route::post('/product/destroy/{product}',['uses'=>'Admin\ProductsController@destroy'])->name('product_destroy');

    Route::get('/update',['uses'=>'Admin\IndexController@update'])->name('update'); //на удаление




    Route::resources([
        'brands' => 'Admin\BrandsController',
        'pages' => 'Admin\PagesController',
        'parsers' => 'Admin\ParsersController'
    ]);




    Route::get('/price_lists',['uses'=>'Admin\PricListsController@index'])->name('p_lists');
    Route::get('/price_lists/add',['uses'=>'Admin\PricListsController@add'])->name('list_add');
    Route::post('/price_lists/add',['uses'=>'Admin\PricListsController@import'])->name('list_import');
    Route::post('/price_lists/parse',['uses'=>'Admin\PricListsController@testParse'])->name('parserst');
    Route::post('/price_lists/add_product',['uses'=>'Admin\PricListsController@addFromParse'])->name('parserstz');
    Route::post('/price_lists/add_price',['uses'=>'Admin\PricListsController@addPrice'])->name('parserstx');


   /* Route::get('/parsers',['uses'=>'Admin\ParsersController@index'])->name('parsers');
    Route::get('/parsers/add',['uses'=>'Admin\ParsersController@add'])->name('parser_add');
    Route::post('/parsers/add',['uses'=>'Admin\ParsersController@store'])->name('parser_store');
    Route::get('/parsers/edit/{parser}',['uses'=>'Admin\ParsersController@edit'])->name('parser_edit');
    Route::post('/parsers/edit/{parser}',['uses'=>'Admin\ParsersController@update'])->name('parser_update');*/
});

Route::get('/{page?}','PageController@index')->name('page');
