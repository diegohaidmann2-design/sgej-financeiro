import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ historico }) {
    const { data, setData, post, processing, errors } = useForm({
        nome_proposta: '',
        valor_principal: '',
        taxa_juros: '',
        prazo_meses: '',
        metodo_calculo: 'price',
    });

    const [resultado, setResultado] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('simulacao.calcular'), {
            onSuccess: (page) => {
                if (historico.length > 0) {
                    setResultado(historico[0]);
                }
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Simulador Financeiro" />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Simulador de Crédito</h1>
                    <p className="text-slate-500">Projete cenários e compare métodos de amortização.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-8">
                        <h2 className="text-xl font-black mb-6">Parâmetros da Simulação</h2>
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nome da Proposta</label>
                                <input type="text" value={data.nome_proposta} onChange={e => setData('nome_proposta', e.target.value)} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="Ex: Investimento Expansão" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Valor Principal (R$)</label>
                                <input type="number" value={data.valor_principal} onChange={e => setData('valor_principal', e.target.value)} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="0,00" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Taxa (% am)</label>
                                    <input type="number" step="0.01" value={data.taxa_juros} onChange={e => setData('taxa_juros', e.target.value)} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Prazo (meses)</label>
                                    <input type="number" value={data.prazo_meses} onChange={e => setData('prazo_meses', e.target.value)} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="12" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Método</label>
                                <select value={data.metodo_calculo} onChange={e => setData('metodo_calculo', e.target.value)} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition">
                                    <option value="simples">Juros Simples</option>
                                    <option value="composto">Juros Compostos</option>
                                    <option value="price">Tabela Price (Francês)</option>
                                    <option value="sac">SAC (Amortização Constante)</option>
                                </select>
                            </div>
                            <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center">
                                {processing && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>}
                                Calcular Projeção
                            </button>
                        </form>
                    </div>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-2 space-y-8">
                    {historico.length > 0 ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">{historico[0].nome_proposta}</h2>
                                    <p className="text-sm text-slate-500">Método: <span className="uppercase font-bold">{historico[0].metodo_calculo}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Custo Total</p>
                                    <p className="text-2xl font-black text-blue-600">R$ {historico[0].detalhes_parcelas.reduce((acc, p) => acc + p.valor, 0).toLocaleString('pt-BR')}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white">
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mês</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Parcela</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Juros</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amortização</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Saldo Devedor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {historico[0].detalhes_parcelas.map(p => (
                                            <tr key={p.numero} className="hover:bg-slate-50/80 transition">
                                                <td className="px-8 py-5 font-bold text-slate-400">{p.numero}º</td>
                                                <td className="px-8 py-5 font-black text-slate-900">R$ {p.valor.toFixed(2)}</td>
                                                <td className="px-8 py-5 text-rose-500 font-medium">R$ {p.juros.toFixed(2)}</td>
                                                <td className="px-8 py-5 text-emerald-600 font-medium">R$ {p.amortizacao.toFixed(2)}</td>
                                                <td className="px-8 py-5 font-bold text-slate-700">R$ {p.saldo.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">Nenhuma simulação ativa</h3>
                            <p className="text-slate-400 max-w-xs mx-auto">Preencha os dados ao lado para projetar seu fluxo de recebimentos.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
