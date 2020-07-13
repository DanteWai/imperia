<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $fillable = ['price_name','price_alias','options'];
    protected $casts = [
        'options' => 'array',
    ];
    //
}
