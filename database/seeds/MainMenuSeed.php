<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MainMenuSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $menus = [
            [
                'menu_name' => 'Каталог',
                'menu_alias' => Str::slug('Каталог'),
                'path' => 'catalog',
            ],
            [
                'menu_name' => 'Оплата',
                'menu_alias' => Str::slug('Оплата'),
                'path' => 'payment',
            ],
            [
                'menu_name' => 'Доставка',
                'menu_alias' => Str::slug('Доставка'),
                'path' => 'delivery',
            ],
            [
                'menu_name' => 'Контакты',
                'menu_alias' => Str::slug('Контакты'),
                'path' => 'contacts',
            ],
        ];

        DB::table('main_menus')->insert($menus);
    }
}
