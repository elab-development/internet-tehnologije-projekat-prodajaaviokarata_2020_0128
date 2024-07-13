<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     
    public function up()
    {
        Schema::table('flights', function (Blueprint $table) {
            $table->integer('version')->default(0);
        });
    }
    
    public function down()
    {
        Schema::table('flights', function (Blueprint $table) {
            $table->dropColumn('version');
        });
    }
    
};
