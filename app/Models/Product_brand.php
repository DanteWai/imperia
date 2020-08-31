<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product_brand extends Model
{
    //
    protected $fillable = ['brand_name','brand_alias','brand_logo','brand_desc','category'];

    protected $primaryKey = 'brand_id';
    protected $casts = [
        'brand_logo' => 'array',
    ];

    public function categories() {
        return $this->belongsToMany('App\Models\Product_category', 'products', 'brand_id', 'category_id');
    }

    public function products() {
        return $this->hasMany('App\Models\Product','brand_id','brand_id');
    }

    public function options() {
        return $this->hasManyThrough('App\Models\Product_option', 'App\Models\Product','brand_id','product_id');
    }
}
