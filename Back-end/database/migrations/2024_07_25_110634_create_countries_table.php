<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountriesTable extends Migration
{
    public function up()
    {
        Schema::create('country', function (Blueprint $table) {
            $table->string('country_name', 45)->primary();
            $table->string('country_code', 45)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('country');
    }
}
