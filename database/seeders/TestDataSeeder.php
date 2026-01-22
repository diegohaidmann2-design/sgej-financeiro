<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cliente;
use App\Models\Emprestimo;
use App\Models\Parcela;
use Carbon\Carbon;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        // Criar um cliente de teste
        $cliente = Cliente::create([
            'nome' => 'João da Silva',
            'cpf_cnpj' => '123.456.789-00',
            'email' => 'joao@email.com',
            'telefone' => '(11) 99999-9999',
            'endereco' => 'Rua das Flores, 123',
            'status' => 'ativo'
        ]);

        // Criar um empréstimo para este cliente
        $emprestimo = Emprestimo::create([
            'cliente_id' => $cliente->id,
            'valor_principal' => 1000.00,
            'taxa_juros' => 5.0,
            'prazo_meses' => 3,
            'metodo_calculo' => 'price',
            'data_inicio' => Carbon::now(),
            'status' => 'ativo'
        ]);

        // Criar parcelas para o empréstimo
        for ($i = 1; $i <= 3; $i++) {
            Parcela::create([
                'emprestimo_id' => $emprestimo->id,
                'numero_parcela' => $i,
                'valor_parcela' => 367.21,
                'valor_juros' => 50.00,
                'valor_amortizacao' => 317.21,
                'data_vencimento' => Carbon::now()->addMonths($i),
                'status' => $i == 1 ? 'pago' : 'pendente',
                'data_pagamento' => $i == 1 ? Carbon::now() : null,
                'valor_pago' => $i == 1 ? 367.21 : 0
            ]);
        }
    }
}
