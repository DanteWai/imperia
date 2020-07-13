<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product_option extends Model
{
    //
    protected $primaryKey = 'option_id';
    protected $fillable = ['product_id','count','price','options', 'full_name', 'full_name_alias','price_lists'];

    protected $casts = [
        'options' => 'array',
        'price_lists' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo('App\Models\Product','product_id','product_id');
    }



}
