<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Parcela;
use App\Models\Cliente;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalParcelas = Parcela::count();
        $parcelasAtrasadas = Parcela::where('status', 'atrasado')->count();
        
        $stats = [
            'totalEmprestado' => Emprestimo::sum('valor_principal'),
            'totalJurosReceber' => Parcela::where('status', '!=', 'pago')->sum('valor_juros'),
            'totalJurosRecebidos' => Parcela::where('status', 'pago')->sum('valor_juros'),
            'taxaInadimplencia' => $totalParcelas > 0 ? round(($parcelasAtrasadas / $totalParcelas) * 100, 2) : 0,
            'totalClientes' => Cliente::count(),
            'lucroProjetado' => Parcela::sum('valor_juros'),
        ];

        $proximosVencimentos = Parcela::with('emprestimo.cliente')
            ->where('status', '!=', 'pago')
            ->where('data_vencimento', '>=', Carbon::today())
            ->orderBy('data_vencimento', 'asc')
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'proximosVencimentos' => $proximosVencimentos
        ]);
    }
}
