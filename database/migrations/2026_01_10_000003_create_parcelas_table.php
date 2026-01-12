<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('parcelas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emprestimo_id')->constrained('emprestimos')->onDelete('cascade');
            $table->integer('numero_parcela');
            $table->decimal('valor_parcela', 15, 2);
            $table->decimal('valor_juros', 15, 2);
            $table->decimal('valor_amortizacao', 15, 2);
            $table->date('data_vencimento');
            $table->date('data_pagamento')->nullable();
            $table->decimal('valor_pago', 15, 2)->default(0);
            $table->decimal('multa_atraso', 15, 2)->default(0);
            $table->decimal('juros_mora', 15, 2)->default(0);
            $table->enum('status', ['pendente', 'pago', 'atrasado', 'parcial'])->default('pendente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('parcelas');
    }
};
