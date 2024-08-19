<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlightReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flight_reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('trip_id');
            $table->integer('to_airport')->unsigned()->nullable();
            $table->string('credit_card_number', 45);
            $table->string('name_on_card', 120);
            $table->float('paid_amount');
            $table->date('date');
            $table->integer('number_of_tickets');
            $table->integer('ticket_price');
            $table->integer('cvv');

            $table->foreign('to_airport')->references('id')->
                on('airport')->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flight_reservations');
    }
}
