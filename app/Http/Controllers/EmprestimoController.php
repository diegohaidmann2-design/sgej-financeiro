<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Parcela;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class EmprestimoController extends Controller
{
    public function index()
    {
        $emprestimos = Emprestimo::with('cliente')
            ->orderByDesc('created_at')
            ->paginate(15);

        $clientes = \App\Models\Cliente::orderBy('nome')->get(['id', 'nome']);

        return Inertia::render('Emprestimos/Index', [
            'emprestimos' => $emprestimos,
            'clientes' => $clientes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'valor_principal' => 'required|numeric|min:0.01',
            'taxa_juros' => 'required|numeric|min:0',
            'prazo_meses' => 'required|integer|min:1',
            'metodo_calculo' => 'required|in:simples,composto,price,sac',
            'data_inicio' => 'required|date',
        ], [
            'cliente_id.required' => 'Selecione um cliente.',
            'cliente_id.exists' => 'O cliente selecionado é inválido.',
            'valor_principal.required' => 'O valor principal é obrigatório.',
            'valor_principal.min' => 'O valor deve ser maior que zero.',
            'taxa_juros.required' => 'A taxa de juros é obrigatória.',
            'prazo_meses.required' => 'O prazo é obrigatório.',
            'metodo_calculo.required' => 'Selecione um método de cálculo.',
            'data_inicio.required' => 'A data de início é obrigatória.',
        ]);

        $emprestimo = Emprestimo::create($validated);

        $this->gerarParcelas($emprestimo);

        return redirect()->back()->with('success', 'Empréstimo gerado com sucesso!');
    }

    private function gerarParcelas(Emprestimo $emprestimo)
    {
        $valorPrincipal = $emprestimo->valor_principal;
        $taxaMensal = $emprestimo->taxa_juros / 100;
        $prazo = $emprestimo->prazo_meses;
        $dataInicio = Carbon::parse($emprestimo->data_inicio);

        for ($i = 1; $i <= $prazo; $i++) {
            $valorJuros = 0;
            $valorAmortizacao = 0;
            $valorParcela = 0;

            if ($emprestimo->metodo_calculo === 'simples') {
                $valorJuros = $valorPrincipal * $taxaMensal;
                $valorAmortizacao = $valorPrincipal / $prazo;
                $valorParcela = $valorAmortizacao + $valorJuros;
            } elseif ($emprestimo->metodo_calculo === 'composto') {
                // Juros Compostos: M = P * (1 + i)^n
                // Aqui calculamos o montante final e dividimos pelo prazo para parcelas iguais (modelo comum)
                $montanteFinal = $valorPrincipal * pow(1 + $taxaMensal, $prazo);
                $valorParcela = $montanteFinal / $prazo;
                $valorJuros = ($montanteFinal - $valorPrincipal) / $prazo;
                $valorAmortizacao = $valorPrincipal / $prazo;
            } elseif ($emprestimo->metodo_calculo === 'price') {
                $valorParcela = $valorPrincipal * ($taxaMensal * pow(1 + $taxaMensal, $prazo)) / (pow(1 + $taxaMensal, $prazo) - 1);
                $valorJuros = ($valorPrincipal - ($i - 1) * ($valorParcela - ($valorPrincipal * $taxaMensal))) * $taxaMensal;
                $valorAmortizacao = $valorParcela - $valorJuros;
            } elseif ($emprestimo->metodo_calculo === 'sac') {
                $valorAmortizacao = $valorPrincipal / $prazo;
                $saldoDevedor = $valorPrincipal - (($i - 1) * $valorAmortizacao);
                $valorJuros = $saldoDevedor * $taxaMensal;
                $valorParcela = $valorAmortizacao + $valorJuros;
            }

            Parcela::create([
                'emprestimo_id' => $emprestimo->id,
                'numero_parcela' => $i,
                'valor_parcela' => $valorParcela,
                'valor_juros' => $valorJuros,
                'valor_amortizacao' => $valorAmortizacao,
                'data_vencimento' => $dataInicio->copy()->addMonths($i),
                'status' => 'pendente',
            ]);
        }
    }

    public function gerarContrato(Emprestimo $emprestimo)
    {
        $emprestimo->load(['cliente', 'parcelas']);
        $pdf = Pdf::loadView('pdf.contrato', compact('emprestimo'));
        return $pdf->download("contrato_emprestimo_{$emprestimo->id}.pdf");
    }
}
