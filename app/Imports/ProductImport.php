<?php

namespace App\Imports;

use App\Models\Product_option;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProductImport implements FromCollection
{
    public function collection()
    {
        return Product_option::all();
    }
}

