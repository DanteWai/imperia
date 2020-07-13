<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('order_id');
            $table->jsonb('status'); /* статус заказа вида, оформлен/ожидани оплаты, оплачено ожидает доставки, доставлен и получен, с датами и флагами */
            $table->jsonb('basket'); /* информация из карзина вида категория->товар->опции->количество, цена */
            $table->jsonb('options'); /* будет ли доставка, адрес доставки, наличный безналичный расчет */
            $table->integer('price')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
