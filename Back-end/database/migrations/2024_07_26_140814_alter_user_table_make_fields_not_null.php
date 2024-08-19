<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUserTableMakeFieldsNotNull extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('user', function (Blueprint $table) {
        //     // Drop foreign key constraint
        //     $table->dropForeign(['country']);
        // });

        Schema::table('user', function (Blueprint $table) {
            // Modify the columns to not nullable
            $table->integer('age')->nullable(false)->change();
            $table->string('gender')->nullable(false)->change();
            $table->string('country')->nullable(false)->change();
        });

        Schema::table('user', function (Blueprint $table) {
            // Add foreign key constraint back
            $table->foreign('country')->references('country_name')->on('country')
                ->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user', function (Blueprint $table) {
            // Drop foreign key constraint
            $table->dropForeign(['country']);
        });

        Schema::table('user', function (Blueprint $table) {
            // Revert the columns to nullable
            $table->integer('age')->nullable()->change();
            $table->string('gender')->nullable()->change();
            $table->string('country')->nullable()->change();
        });

        Schema::table('user', function (Blueprint $table) {
            // Add foreign key constraint back
            $table->foreign('country')->references('id')->on('countries')
                ->onDelete('NO ACTION')->onUpdate('NO ACTION');
        });
    }
}
