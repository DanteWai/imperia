<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/brands', function ()  {
    $brands_rep =  new \App\Repositories\BrandsRepository(new \App\Models\Product_brand());
    return response()->json($brands_rep->get());
});
Route::post('/brands', function (Request $request)  {
    $brands_rep =  new \App\Repositories\BrandsRepository(new \App\Models\Product_brand());
    return response()->json($brands_rep->addBrand($request), 201);
});
Route::put('/brands/{brand}', function (Request $request, \App\Models\Product_brand $brand)  {
    $brands_rep =  new \App\Repositories\BrandsRepository(new \App\Models\Product_brand());
    return response()->json($brands_rep->updateBrand($request, $brand), 200);
});
Route::delete('/brands/{brand}', 'Admin\BrandsController@destroy');




Route::get('/brand_aliases', function () {
    return response()->json(\App\Models\Brand_alias::all());
});
Route::post('/brand_aliases', function (Request $request)  {
    $data = $request->only('alias_name','brand_id');

    if(!isset($data['alias_name']) || !isset($data['brand_id'])) {
        return response()->json(['error'=>'Нет необходимых данных']);
    }

    $alias = new \App\Models\Brand_alias();
    $alias->alias_name = $data['alias_name'];
    $alias->brand_id = $data['brand_id'];

    if($alias->save()){
        return response()->json(['status' => 'Запись успешно добавлена']);
    } else {
        return response()->json(['error' => 'Во время добавление произошла ошибка']);
    }
});
Route::put('/brand_aliases/{alias}', function (Request $request, \App\Models\Brand_alias $alias)  {

    $data = $request->only('alias_name','brand_id');
    if(!isset($data['alias_name']) && !isset($data['brand_id'])) {
        return response()->json(['error'=>'Нет необходимых данных']);
    }
    $alias->fill($data);

    if($alias->update()){
        return response()->json(['status' => 'Запись успешно обновлена']);
    } else {
        return response()->json(['error' => 'Во время обновления произошла ошибка']);
    }
});
Route::delete('/brand_aliases/{alias}', function (Request $request, \App\Models\Brand_alias $alias){
    if($alias->delete()){
        return response()->json(['status' => 'Запись успешно удалена']);
    } else {
        return response()->json(['error' => 'Во время удаления произошла ошибка']);
    }
});

