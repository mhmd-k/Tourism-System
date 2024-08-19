<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAirportsTable extends Migration
{
    public function up()
    {
        Schema::create('airport', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100)->nullable();
            $table->string('address', 200)->nullable();
            $table->integer('city_id')->unsigned()->nullable();
            $table->string('location', 250)->nullable();

            $table->foreign('city_id')->references('city_id')->on('city')->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    public function down()
    {
        Schema::dropIfExists('airport');
    }
}
