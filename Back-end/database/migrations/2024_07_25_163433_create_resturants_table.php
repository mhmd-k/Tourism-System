<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResturantsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resturant', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->nullable();
            $table->string('location', 250)->nullable();
            $table->string('address', 200)->nullable();
            $table->integer('city_id')->unsigned()->nullable();
            $table->float('price')->nullable();
            $table->integer('stars')->nullable();
            $table->string('food_type')->nullable();

            $table->foreign('city_id')->references('city_id')->on('city')->onDelete('NO ACTION')->onUpdate('NO ACTION');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resturant');
        Schema::dropIfExists('resturan');
    }
}
;