<?php

namespace App\Http\Controllers;

use App\Models\Parcela;
use App\Models\Emprestimo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class PagamentoController extends Controller
{
    public function index()
    {
        $pagamentos = Parcela::whereIn('status', ['PAGO', 'pago'])
            ->with('emprestimo.cliente')
            ->orderByDesc('data_pagamento')
            ->paginate(15);

        $pendentes = Parcela::whereNotIn('status', ['PAGO', 'pago'])
            ->with('emprestimo.cliente')
            ->orderBy('data_vencimento')
            ->take(10)
            ->get();

        return Inertia::render('Pagamentos/Index', [
            'pagamentos' => $pagamentos,
            'pendentes' => $pendentes
        ]);
    }

    public function estornar($id)
    {
        $parcela = Parcela::findOrFail($id);
        
        $parcela->update([
            'status' => $parcela->data_vencimento < now() ? 'ATRASADO' : 'PENDENTE',
            'valor_pago' => null,
            'data_pagamento' => null,
            'multa_paga' => 0,
            'juros_mora_pago' => 0
        ]);

        // Reverter status do empréstimo se necessário
        $emprestimo = $parcela->emprestimo;
        if (strtolower($emprestimo->status) === 'quitado') {
            $emprestimo->update(['status' => 'ATIVO']);
        }

        return back()->with('success', 'Pagamento estornado com sucesso!');
    }
}
