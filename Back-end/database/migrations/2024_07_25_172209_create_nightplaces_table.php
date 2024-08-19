<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nightplace', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100)->nullable();
            $table->string('location', 250)->nullable();
            $table->string('address', 200)->nullable();
            $table->string('description', 200)->nullable();
            $table->integer('city_id')->unsigned()->nullable();
            $table->float('price')->nullable();
            $table->float('time')->nullable();

            $table->foreign('city_id')->references('city_id')->on('city')->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('night_place');
    }
};
