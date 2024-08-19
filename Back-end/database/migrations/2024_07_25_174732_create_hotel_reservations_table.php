<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotel_reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('trip_id');
            $table->integer('hotel_id')->unsigned()->nullable();
            $table->string('credit_card_number', 45);
            $table->string('name_on_card', 120);
            $table->float('paid_amount');
            $table->date('date');
            $table->integer('cvv');

            $table->foreign('trip_id')->references('id')->on('trip')->onDelete('cascade');
            $table->foreign('hotel_id')->references('id')->on('hotel')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hotel_reservations');
    }
}