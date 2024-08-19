<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitiesTable extends Migration
{
    public function up()
    {
        Schema::create('city', function (Blueprint $table) {
            $table->increments('city_id');
            $table->string('name', 100)->nullable();
            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();
            $table->string('country', 45)->nullable();
            $table->boolean('capital')->nullable();

            $table->foreign('country')->references('country_name')->on('country')->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    public function down()
    {
        Schema::dropIfExists('city');
    }
}
