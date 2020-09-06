<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand_alias extends Model
{
    //
    protected $table = 'brand_aliases';
    protected $fillable = ['alias_name','brand_id'];
}
