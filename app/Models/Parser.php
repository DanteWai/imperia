<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parser extends Model
{
    //

    protected $casts = [
        'parser_options' => 'array',
    ];

    protected $fillable = [
        'parser_name', 'parser_alias', 'parser_options',
    ];
}
