<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDayplacesTable extends Migration
{
    public function up()
    {
        Schema::create('dayplaces', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('day_id');
            $table->integer('place_id')->unsigned()->nullable();
            $table->string('place_type', 45)->nullable();
            $table->integer('index')->nullable();
            $table->string('transport_method', 10)->nullable();
            $table->float('money_amount')->nullable();
            $table->float('pre_distance')->nullable();

            $table->foreign('day_id')->references('id')->on('tripday')->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    public function down()
    {
        Schema::dropIfExists('dayplaces');
    }
}
