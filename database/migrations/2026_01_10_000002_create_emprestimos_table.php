<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emprestimos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->decimal('valor_principal', 15, 2);
            $table->decimal('taxa_juros', 5, 2);
            $table->integer('prazo_meses');
            $table->integer('carencia_dias')->default(0);
            $table->enum('metodo_calculo', ['simples', 'composto', 'price', 'sac']);
            $table->date('data_inicio');
            $table->enum('status', ['ativo', 'quitado', 'renegociado', 'inadimplente'])->default('ativo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emprestimos');
    }
};
