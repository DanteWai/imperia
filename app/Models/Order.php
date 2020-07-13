<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $primaryKey = 'order_id';
    protected $fillable = ['status','basket','options','price'];
    protected $casts = [
        'status' => 'array',
        'basket' => 'array',
        'options' => 'array',
    ];
}
