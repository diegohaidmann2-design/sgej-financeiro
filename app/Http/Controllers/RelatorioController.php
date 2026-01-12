<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Parcela;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class RelatorioController extends Controller
{
    public function index()
    {
        $hoje = Carbon::today();
        
        $resumo = [
            'total_emprestado' => Emprestimo::sum('valor_principal'),
            'total_recebido' => Parcela::where('status', 'pago')->sum('valor_pago'),
            'total_pendente' => Parcela::where('status', 'pendente')->sum('valor_parcela'),
            'total_atrasado' => Parcela::where('status', 'atrasado')->sum('valor_parcela'),
            'lucro_juros' => Parcela::where('status', 'pago')->sum('valor_juros'),
        ];

        $recebimentos_mes = Parcela::whereMonth('data_vencimento', $hoje->month)
            ->whereYear('data_vencimento', $hoje->year)
            ->with('emprestimo.cliente')
            ->orderBy('data_vencimento')
            ->get();

        return Inertia::render('Relatorios/Index', [
            'resumo' => $resumo,
            'recebimentos_mes' => $recebimentos_mes
        ]);
    }

    public function exportarPdf(Request $request)
    {
        $tipo = $request->get('tipo', 'geral');
        $hoje = Carbon::today();

        $dados = [
            'data_geracao' => $hoje->format('d/m/Y'),
            'resumo' => [
                'total_emprestado' => Emprestimo::sum('valor_principal'),
                'total_recebido' => Parcela::where('status', 'pago')->sum('valor_pago'),
                'total_pendente' => Parcela::where('status', 'pendente')->sum('valor_parcela'),
                'total_atrasado' => Parcela::where('status', 'atrasado')->sum('valor_parcela'),
                'lucro_juros' => Parcela::where('status', 'pago')->sum('valor_juros'),
            ],
            'parcelas_atrasadas' => Parcela::where('status', 'atrasado')
                ->with('emprestimo.cliente')
                ->orderBy('data_vencimento')
                ->get()
        ];

        $pdf = Pdf::loadView('pdf.relatorio_financeiro', $dados);
        return $pdf->download("relatorio_financeiro_{$hoje->format('Y_m_d')}.pdf");
    }
}
