<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyToTripdayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tripday', function (Blueprint $table) {
            // Ensure the column 'flight' exists and is of type integer
            $table->unsignedBigInteger('flight')->change();

            // Add the foreign key constraint
            $table->foreign('flight')->references('id')->on('flight_reservations')->onDelete('cascade');
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
            // Drop the foreign key constraint
            $table->dropForeign(['flight']);

            // Optionally change the column back to its previous state
            // If it was an integer, you might need to change it back to int(11)
            // $table->integer('flight', 11)->change();
        });
    }
}
