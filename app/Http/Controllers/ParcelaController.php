<?php

namespace App\Http\Controllers;

use App\Models\Parcela;
use App\Models\Emprestimo;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ParcelaController extends Controller
{
    public function pagar(Request $request, Parcela $parcela)
    {
        $validated = $request->validate([
            'valor_pago' => 'required|numeric|min:0.01',
            'data_pagamento' => 'required|date',
        ]);

        $valorPago = $validated['valor_pago'];
        $dataPagamento = Carbon::parse($validated['data_pagamento']);
        
        // Lógica de Multa e Juros de Mora se houver atraso
        $multa = 0;
        $jurosMora = 0;
        
        if ($dataPagamento->gt(Carbon::parse($parcela->data_vencimento))) {
            // Exemplo: 2% de multa + 1% de juros ao mês pro-rata die
            $multa = $parcela->valor_parcela * 0.02;
            $diasAtraso = $dataPagamento->diffInDays(Carbon::parse($parcela->data_vencimento));
            $jurosMora = ($parcela->valor_parcela * 0.01 / 30) * $diasAtraso;
        }

        $totalDevido = $parcela->valor_parcela + $multa + $jurosMora;

        if ($valorPago >= $totalDevido) {
            $parcela->update([
                'valor_pago' => $valorPago,
                'data_pagamento' => $dataPagamento,
                'multa_atraso' => $multa,
                'juros_mora' => $jurosMora,
                'status' => 'pago',
            ]);
        } else {
            $parcela->update([
                'valor_pago' => $parcela->valor_pago + $valorPago,
                'data_pagamento' => $dataPagamento,
                'status' => 'parcial',
            ]);
        }

        // Verificar se todas as parcelas do empréstimo foram pagas
        $this->verificarQuitacaoEmprestimo($parcela->emprestimo_id);

        return redirect()->back();
    }

    private function verificarQuitacaoEmprestimo($emprestimoId)
    {
        $emprestimo = Emprestimo::with('parcelas')->find($emprestimoId);
        $todasPagas = $emprestimo->parcelas->every(fn($p) => $p->status === 'pago');

        if ($todasPagas) {
            $emprestimo->update(['status' => 'quitado']);
        }
    }
}
