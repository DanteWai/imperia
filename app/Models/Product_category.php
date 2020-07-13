<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product_category extends Model
{
    //
    /* в документации расширенная версия не написана но получается что то вроде этого
        1. Модель с которой связываем
        2. Табличка ЧЕРЕЗ которую связываем
        3. Поле через которое связыаем главную табличку (в табличке посреднике)
        4. Поле через которое связываем подчиненую табличку (в табличке посреднике)
        5. Поле с ид основной таблицы
        6. Поле с ид подчиненной таблицы
    */
    protected $primaryKey = 'category_id';
    protected $casts = [
        'category_options' => 'array',
    ];

    public function brands() {
        return $this->belongsToMany('App\Models\Product_brand', 'products', 'category_id', 'brand_id','category_id','brand_id');
    }

    public function products() {
        return $this->hasMany('App\Models\Product','category_id','category_id');
    }
}
