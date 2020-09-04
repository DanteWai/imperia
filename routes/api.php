<?php

use App\Models\Product_brand;
use App\Repositories\BrandsRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$brands_rep =  new BrandsRepository(new Product_brand());

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/brands', function ()  use ($brands_rep) {
    return response()->json($brands_rep->get());
});
Route::post('/brands', function (Request $request)  use ($brands_rep) {
    return response()->json($brands_rep->addBrand($request), 201);
});
Route::put('/brands/{brand}', function (Request $request, Product_brand $brand)  use ($brands_rep) {
    return response()->json($brands_rep->updateBrand($request, $brand), 200);
});
Route::delete('/brands/{brand}', 'Admin\BrandsController@destroy');
