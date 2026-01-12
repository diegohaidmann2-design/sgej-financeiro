import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ pagamentos, pendentes }) {
    const { post } = useForm();

    const handleEstorno = (id) => {
        if (confirm('Tem certeza que deseja estornar este pagamento? A parcela voltará a ficar pendente.')) {
            post(route('pagamentos.estornar', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestão de Pagamentos" />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Fluxo de Caixa</h1>
                    <p className="text-slate-500">Monitore entradas, baixas e realize estornos.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Payments */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-100">
                            <h2 className="text-xl font-black">Histórico de Recebimentos</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Pago</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Total</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pagamentos.data.map(p => (
                                        <tr key={p.id} className="hover:bg-slate-50/80 transition">
                                            <td className="px-8 py-5 font-bold text-emerald-600">{new Date(p.data_pagamento).toLocaleDateString('pt-BR')}</td>
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-slate-900">{p.emprestimo.cliente.nome}</div>
                                                <div className="text-[10px] text-slate-400 uppercase font-black">Empréstimo #{p.emprestimo_id}</div>
                                            </td>
                                            <td className="px-8 py-5 font-black text-slate-900 text-lg">R$ {parseFloat(p.valor_pago).toFixed(2)}</td>
                                            <td className="px-8 py-5 text-right">
                                                <button onClick={() => handleEstorno(p.id)} className="text-rose-500 hover:text-rose-700 font-black text-xs uppercase tracking-widest transition">
                                                    Estornar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {pagamentos.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center text-slate-400 italic">Nenhum pagamento registrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pending Column */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-slate-200">
                        <h2 className="text-xl font-black mb-6 flex items-center">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></span>
                            Próximas Baixas
                        </h2>
                        <div className="space-y-6">
                            {pendentes.map(p => (
                                <div key={p.id} className="border-l-2 border-slate-700 pl-4 py-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{new Date(p.data_vencimento).toLocaleDateString('pt-BR')}</p>
                                    <p className="font-bold text-sm truncate">{p.emprestimo.cliente.nome}</p>
                                    <p className="text-lg font-black text-blue-400">R$ {parseFloat(p.valor_parcela).toFixed(2)}</p>
                                    <Link href={route('clientes.show', p.emprestimo.cliente_id)} className="text-[10px] font-black text-slate-400 hover:text-white transition uppercase tracking-tighter mt-2 inline-block">
                                        Ir para Perfil →
                                    </Link>
                                </div>
                            ))}
                            {pendentes.length === 0 && (
                                <p className="text-slate-500 text-sm italic">Tudo em dia por aqui.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
