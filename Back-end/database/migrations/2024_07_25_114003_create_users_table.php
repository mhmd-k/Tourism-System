<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45);
            $table->string('image_reference', 100)->nullable();
            $table->string('email', 100)->unique();
            $table->string('password', 100);
            $table->integer('age')->nullable();
            $table->string('gender', 10)->nullable();
            $table->string('country', 45)->nullable();

            $table->foreign('country')->references('country_name')->on('country')->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    public function down()
    {
        Schema::dropIfExists('user');
    }
}
