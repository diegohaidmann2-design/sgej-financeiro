<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Emprestimo;
use App\Models\Parcela;
use App\Models\Cliente;

class IAController extends Controller
{
    public function index()
    {
        return Inertia::render('IA/Index');
    }

    public function chat(Request $request)
    {
        $request->validate(['message' => 'required|string']);
        
        // Contexto do sistema para a IA
        $stats = [
            'total_clientes' => Cliente::count(),
            'total_emprestado' => Emprestimo::sum('valor_principal'),
            'total_atrasado' => Parcela::whereIn('status', ['ATRASADO', 'atrasado'])->sum('valor_parcela'),
        ];

        // Resposta simulada inteligente baseada nos dados reais do banco
        $resposta = "Com base nos dados do SGEJ, atualmente temos {$stats['total_clientes']} clientes ativos. O volume total emprestado é de R$ " . number_format($stats['total_emprestado'], 2, ',', '.') . ". Notei que temos R$ " . number_format($stats['total_atrasado'], 2, ',', '.') . " em parcelas atrasadas, o que sugere uma atenção especial à cobrança este mês.";

        return response()->json(['reply' => $resposta]);
    }
}
