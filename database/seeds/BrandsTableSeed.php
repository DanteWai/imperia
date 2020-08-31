<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BrandsTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $input = [];
        $brands = [
            'Avon','Avatyre','Aeolus','Avon Vintage',' Accelera','Autogrip','Bridgestone'
        ];

        foreach($brands as $key=>$item) {
            $input[] = [
                'brand_name' => $item,
                'brand_alias' => Str::slug($item),
                'category' => json_encode([rand(1,2)])
            ];
        }

        DB::table('product_brands')->insert($input);
    }


}
