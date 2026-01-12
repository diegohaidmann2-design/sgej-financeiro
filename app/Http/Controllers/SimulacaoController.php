<?php

namespace App\Http\Controllers;

use App\Models\Simulacao;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SimulacaoController extends Controller
{
    public function index()
    {
        return Inertia::render('Simulacao/Index', [
            'historico' => Simulacao::where('user_id', Auth::id())->latest()->take(5)->get()
        ]);
    }

    public function calcular(Request $request)
    {
        $validated = $request->validate([
            'nome_proposta' => 'required|string|max:255',
            'valor_principal' => 'required|numeric|min:100',
            'taxa_juros' => 'required|numeric|min:0.1',
            'prazo_meses' => 'required|integer|min:1|max:480',
            'metodo_calculo' => 'required|in:simples,composto,price,sac',
        ]);

        $parcelas = $this->gerarParcelas(
            $validated['valor_principal'],
            $validated['taxa_juros'],
            $validated['prazo_meses'],
            $validated['metodo_calculo']
        );

        $simulacao = Simulacao::create([
            'user_id' => Auth::id(),
            'nome_proposta' => $validated['nome_proposta'],
            'valor_principal' => $validated['valor_principal'],
            'taxa_juros' => $validated['taxa_juros'],
            'prazo_meses' => $validated['prazo_meses'],
            'metodo_calculo' => $validated['metodo_calculo'],
            'detalhes_parcelas' => $parcelas
        ]);

        return back()->with('success', 'Simulação realizada com sucesso!');
    }

    private function gerarParcelas($principal, $taxaMensal, $prazo, $metodo)
    {
        $parcelas = [];
        $taxa = $taxaMensal / 100;
        $saldoDevedor = $principal;

        if ($metodo === 'simples') {
            $jurosTotal = $principal * $taxa * $prazo;
            $valorParcela = ($principal + $jurosTotal) / $prazo;
            for ($i = 1; $i <= $prazo; $i++) {
                $parcelas[] = [
                    'numero' => $i,
                    'valor' => round($valorParcela, 2),
                    'juros' => round($jurosTotal / $prazo, 2),
                    'amortizacao' => round($principal / $prazo, 2),
                    'saldo' => round($principal - ($principal / $prazo * $i), 2)
                ];
            }
        } elseif ($metodo === 'composto') {
            $montanteFinal = $principal * pow(1 + $taxa, $prazo);
            $valorParcela = $montanteFinal / $prazo;
            $jurosMensal = ($montanteFinal - $principal) / $prazo;
            $amortizacaoMensal = $principal / $prazo;
            for ($i = 1; $i <= $prazo; $i++) {
                $parcelas[] = [
                    'numero' => $i,
                    'valor' => round($valorParcela, 2),
                    'juros' => round($jurosMensal, 2),
                    'amortizacao' => round($amortizacaoMensal, 2),
                    'saldo' => round(max(0, $principal - ($amortizacaoMensal * $i)), 2)
                ];
            }
        } elseif ($metodo === 'price') {
            $valorParcela = $principal * ($taxa * pow(1 + $taxa, $prazo)) / (pow(1 + $taxa, $prazo) - 1);
            for ($i = 1; $i <= $prazo; $i++) {
                $juros = $saldoDevedor * $taxa;
                $amortizacao = $valorParcela - $juros;
                $saldoDevedor -= $amortizacao;
                $parcelas[] = [
                    'numero' => $i,
                    'valor' => round($valorParcela, 2),
                    'juros' => round($juros, 2),
                    'amortizacao' => round($amortizacao, 2),
                    'saldo' => round(max(0, $saldoDevedor), 2)
                ];
            }
        } elseif ($metodo === 'sac') {
            $amortizacao = $principal / $prazo;
            for ($i = 1; $i <= $prazo; $i++) {
                $juros = $saldoDevedor * $taxa;
                $valorParcela = $amortizacao + $juros;
                $saldoDevedor -= $amortizacao;
                $parcelas[] = [
                    'numero' => $i,
                    'valor' => round($valorParcela, 2),
                    'juros' => round($juros, 2),
                    'amortizacao' => round($amortizacao, 2),
                    'saldo' => round(max(0, $saldoDevedor), 2)
                ];
            }
        }

        return $parcelas;
    }
}
