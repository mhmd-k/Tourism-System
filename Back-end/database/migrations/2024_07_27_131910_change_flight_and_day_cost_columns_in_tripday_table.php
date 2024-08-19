<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFlightAndDayCostColumnsInTripdayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tripday', function (Blueprint $table) {
            $table->unsignedInteger('flight')->nullable()->change();
            $table->integer('day_cost')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tripday', function (Blueprint $table) {
            $table->unsignedInteger('flight')->nullable(false)->change();
            $table->integer('day_cost')->nullable(false)->change();
        });
    }
}
