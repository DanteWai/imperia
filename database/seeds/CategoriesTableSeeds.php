<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoriesTableSeeds extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $categories = [];
        $categories_name = ['Шины', 'Диски'];
        $categories_alias = ['shiny', 'diski'];

        $first = json_encode([
            'легковые',
            'грузовые'
        ]);

        $last = json_encode([
                    'литые',
                'стальные'
            ]);
        $options = [$first,$last];



        foreach($categories_name as $key=>$item) {
            $categories[] = [
                'category_name' => $categories_name[$key],
                'category_alias' => $categories_alias[$key],
                'category_options' =>  $options[$key],
            ];
        }

        DB::table('product_categories')->insert($categories);
    }
}
