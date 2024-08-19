<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTripdaysTable extends Migration
{
    public function up()
    {
        Schema::create('tripday', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('trip_id');
            $table->unsignedInteger('city_id');
            $table->string('date');
            $table->unsignedInteger('hotel_id');
            $table->string('transportation_method');
            $table->unsignedInteger('flight');
            $table->integer('day_cost');

            $table->foreign('trip_id')->references('id')->on('trip')->onDelete('NO ACTION')->onUpdate('NO ACTION');
            $table->foreign('city_id')->references('city_id')->on('city')->onDelete('NO ACTION')->onUpdate('NO ACTION');
            $table->foreign('hotel_id')->references('id')->on('hotel')->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tripday');
    }
}
