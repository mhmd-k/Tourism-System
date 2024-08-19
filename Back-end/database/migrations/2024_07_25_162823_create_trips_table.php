<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTripsTable extends Migration
{
    public function up()
    {
        Schema::create('trip', function (Blueprint $table) {
            $table->id();
            $table->string('trip_name');
            $table->string('country', 45);
            $table->float('total_cost');
            $table->string('form_city', 45);
            $table->integer('number_of_people');
            $table->integer('number_of_days');
            $table->integer('budget');
            $table->string('transportation', 45);
            $table->integer('trip_cost');
            $table->unsignedInteger('user_id');

            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('country')->references('country_name')->on('country')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('trip');
    }
}
