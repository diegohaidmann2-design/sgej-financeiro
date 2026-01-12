<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('clientes', function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('emprestimos', function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('parcelas', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('clientes', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('emprestimos', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('parcelas', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
