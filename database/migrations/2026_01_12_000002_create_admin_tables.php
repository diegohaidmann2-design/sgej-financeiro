<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Tabela de Planos
        Schema::create('planos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('slug')->unique();
            $table->decimal('preco', 10, 2);
            $table->integer('limite_clientes')->default(0); // 0 = ilimitado
            $table->integer('limite_emprestimos')->default(0);
            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });

        // Tabela de Assinaturas
        Schema::create('assinaturas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('plano_id')->constrained();
            $table->timestamp('vencimento_em')->nullable();
            $table->string('status')->default('ativo'); // ativo, cancelado, pendente
            $table->timestamps();
        });

        // Tabela de Configurações Globais (Key-Value)
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('group')->default('geral'); // email, checkout, sistema
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('assinaturas');
        Schema::dropIfExists('planos');
    }
};
