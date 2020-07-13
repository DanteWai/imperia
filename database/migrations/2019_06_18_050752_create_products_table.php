<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('product_id');
            $table->integer('brand_id')->unsigned();
            $table->integer('category_id')->unsigned();
            $table->string('product_model',255);
            $table->jsonb('product_images')->nullable();
            $table->text('product_desc')->nullable();
            $table->timestamps();

            $table->foreign('brand_id')->references('brand_id')->on('product_brands');
            $table->foreign('category_id')->references('category_id')->on('product_categories');
        });
    }



    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
