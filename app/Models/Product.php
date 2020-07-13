<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $primaryKey = 'product_id';

    protected $fillable = ['category_id','brand_id','product_model','product_desc', 'product_images'];

    protected $casts = [
        'product_images' => 'array',
    ];

    public function category() {
        return $this->belongsTo('App\Models\Product_category','category_id','category_id');
    }

    public function brand() {
        return $this->belongsTo('App\Models\Product_brand','brand_id','brand_id');
    }

    public function options(){
        return $this->hasMany('App\Models\Product_option','product_id','product_id');
    }

}
