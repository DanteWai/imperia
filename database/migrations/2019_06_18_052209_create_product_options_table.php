<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_options', function (Blueprint $table) {
            $table->increments('option_id');
            $table->integer('count')->unsigned();
            $table->integer('price')->unsigned();
            $table->jsonb('options');

            $table->jsonb('price_lists')->nullable();
            $table->jsonb('parser_links')->nullable();

            $table->timestamps();

            $table->integer('views')->unsigned()->default(0);
            $table->integer('purchases')->unsigned()->default(0);

            $table->string('full_name');
            $table->string('full_name_alias');

            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('product_id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_options');
    }
}
