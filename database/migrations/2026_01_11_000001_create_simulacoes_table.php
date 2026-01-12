<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('simulacoes', function (Blueprint $header) {
            $header->id();
            $header->foreignId('user_id')->constrained()->onDelete('cascade');
            $header->string('nome_proposta');
            $header->decimal('valor_principal', 15, 2);
            $header->decimal('taxa_juros', 8, 2);
            $header->integer('prazo_meses');
            $header->enum('metodo_calculo', ['simples', 'price', 'sac']);
            $header->json('detalhes_parcelas');
            $header->timestamps();
        });

        Schema::create('notificacoes', function (Blueprint $header) {
            $header->id();
            $header->foreignId('user_id')->constrained()->onDelete('cascade');
            $header->string('titulo');
            $header->text('mensagem');
            $header->string('tipo')->default('info'); // info, warning, success, danger
            $header->boolean('lida')->default(false);
            $header->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notificacoes');
        Schema::dropIfExists('simulacoes');
    }
};
