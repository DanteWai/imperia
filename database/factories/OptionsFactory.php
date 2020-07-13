<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Product_option;
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

$factory->define(Product_option::class, function (Faker $faker) {

    $width = strval(rand(13,32)*10);
    $height = strval(rand(3,8)*10);
    $radius = strval(rand(12,22));
    $max_speed = strval(rand(22,32)*10);


    $diameter = strval(rand(-5,5)*10);
    $mount = strval(rand(1,5)).'*100';
    $color = ['синий','красный','белый','малиновый','розовый'];
    $departure = strval(rand(1,7)*10);
    $dia = strval(rand(50,120));



    $created_at = $faker->dateTimeBetween('-3 months','-2 days');

    $data = [
        'product_id' => rand(1,500),
        'count' => rand(0,12),
        'price' => rand(5,50)*100,
        'full_name' => "full_name",
        'full_name_alias' => "full_name_alias",
        'created_at' => $created_at,
        'updated_at' => $created_at,
    ];

    if(rand(1,4) !== 4) {
        $data['options'] = [
            'width' => $width,
            'height' => $height,
            'radius' => $radius,
            'season' => (rand(1,2) === 1) ? 'лето' : 'зима',
            'heavy' => (rand(1,2) === 1) ? 'true' : 'false',
            'load' => 'w',
            'm_speed' => $max_speed,

        ];
    }

    else {
        $data['options'] = [
            'width' => $width,
            'diameter' => $diameter,
            'mount' => $mount,
            'color' => $color[rand(0,4)],
            'departure' => $departure,
            'dia' => $dia,

        ];
    }

    return $data;

});
