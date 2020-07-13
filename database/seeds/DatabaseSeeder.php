<?php

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Product_option;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(MainMenuSeed::class);
         $this->call(CategoriesTableSeeds::class);
         /*$this->call(BrandsTableSeed::class);
        factory(\App\Models\Product::class, 500)->create();
        factory(\App\Models\Product_option::class, 3000)->create();*/

    }
}
