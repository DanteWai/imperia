<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBrandAliases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('brand_aliases', function (Blueprint $table) {
            $table->id();
            $table->integer('brand_id');
            $table->string('alias_name');
            $table->timestamps();

            $table->unique(['brand_id','alias_name']);

            $table->foreign('brand_id')->references('brand_id')->on('product_brands');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('brand_aliases');
    }
}
