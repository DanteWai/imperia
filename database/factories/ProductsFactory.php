<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Product;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Product::class, function (Faker $faker) {

    $model = $faker->sentence(rand(3,8), true);
    $created_at = $faker->dateTimeBetween('-3 months','-2 days');
    $category_id = rand(1,2);

    if($category_id === 1){
        $brand_id = rand(1,3);
    }
    else{
        $brand_id = rand(4,7);
    }




    $data = [
        'category_id' => $category_id,
        'brand_id' => $brand_id,
        'product_model' => $model,
        'created_at' => $created_at,
        'updated_at' => $created_at,
    ];

    return $data;
});
