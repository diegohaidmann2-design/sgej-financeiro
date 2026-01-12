import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Metodos() {
    const metodos = [
        {
            nome: 'Juros Simples',
            formula: 'J = P * i * n',
            descricao: 'O método mais básico. Os juros são calculados apenas sobre o valor principal do empréstimo. O valor dos juros é o mesmo em todas as parcelas.',
            vantagem: 'Previsibilidade e custo geralmente menor em prazos curtos.',
            exemplo: 'Empréstimo de R$ 1.000,00 a 10% am por 2 meses: Juros de R$ 100,00 por mês.'
        },
        {
            nome: 'Juros Compostos',
            formula: 'M = P * (1 + i)^n',
            descricao: 'Conhecido como "juros sobre juros". O cálculo é feito sobre o montante acumulado do período anterior. No SGEJ, distribuímos o montante final igualmente pelo prazo.',
            vantagem: 'Reflete a realidade do mercado financeiro moderno e investimentos.',
            exemplo: 'Empréstimo de R$ 1.000,00 a 10% am por 2 meses: Montante final de R$ 1.210,00.'
        },
        {
            nome: 'Tabela Price (Francês)',
            formula: 'P = V * [i * (1 + i)^n] / [(1 + i)^n - 1]',
            descricao: 'As parcelas são fixas durante todo o contrato. No início, a maior parte da parcela é juros; no final, a maior parte é amortização do principal.',
            vantagem: 'Parcelas iguais facilitam o planejamento financeiro do devedor.',
            exemplo: 'Financiamentos de veículos e eletrodomésticos geralmente usam este método.'
        },
        {
            nome: 'SAC (Sistema de Amortização Constante)',
            formula: 'A = P / n',
            descricao: 'A amortização do valor principal é constante em todas as parcelas. Como o saldo devedor diminui, os juros também diminuem, resultando em parcelas decrescentes.',
            vantagem: 'O custo total do empréstimo é menor que na Tabela Price para o mesmo prazo.',
            exemplo: 'Muito utilizado em financiamentos imobiliários de longo prazo.'
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Explicação de Métodos" />
            
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900">Métodos de Cálculo</h1>
                <p className="text-slate-500 font-medium">Entenda a matemática por trás de cada modalidade de empréstimo no SGEJ.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {metodos.map((m, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition">{m.nome}</h2>
                            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Fórmula: {m.formula}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            {m.descricao}
                        </p>
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vantagem Principal</p>
                                <p className="text-sm text-slate-700 font-bold">{m.vantagem}</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Exemplo Prático</p>
                                <p className="text-sm text-emerald-700 font-bold">{m.exemplo}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black mb-4">Dica do DevOps</h3>
                <p className="text-slate-400 max-w-2xl leading-relaxed font-medium">
                    A escolha do método impacta diretamente no fluxo de caixa do seu cliente e na sua rentabilidade. Para prazos longos, o **SAC** protege melhor o capital, enquanto a **Tabela Price** é mais atrativa para quem precisa de parcelas que caibam no orçamento mensal sem variações.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
