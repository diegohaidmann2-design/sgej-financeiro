import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ resumo, recebimentos_mes }) {
    return (
        <AuthenticatedLayout>
            <Head title="Relatórios Financeiros" />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Relatórios Financeiros</h1>
                    <p className="text-slate-500">Análise detalhada do fluxo de caixa e inadimplência.</p>
                </div>
                <a href={route('relatorios.pdf')} target="_blank" className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-rose-700 transition shadow-xl shadow-rose-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Exportar PDF Geral
                </a>
            </div>

            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total Recebido</p>
                    <p className="text-4xl font-black text-emerald-600">R$ {resumo.total_recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total em Atraso</p>
                    <p className="text-4xl font-black text-rose-600">R$ {resumo.total_atrasado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Lucro Real (Juros)</p>
                    <p className="text-4xl font-black text-blue-600">R$ {resumo.lucro_juros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>

            {/* Tabela de Recebimentos do Mês */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-800">Recebimentos Previstos para este Mês</h2>
                    <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Janeiro 2026</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vencimento</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recebimentos_mes.map(parc => (
                                <tr key={parc.id} className="hover:bg-slate-50/80 transition group">
                                    <td className="px-8 py-5 font-bold text-slate-700">{new Date(parc.data_vencimento).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-8 py-5 font-medium text-slate-600">{parc.emprestimo.cliente.nome}</td>
                                    <td className="px-8 py-5 font-black text-slate-900 text-lg">R$ {parseFloat(parc.valor_parcela).toFixed(2)}</td>
                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                            parc.status === 'pago' ? 'bg-emerald-50 text-emerald-600' : 
                                            parc.status === 'atrasado' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {parc.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {recebimentos_mes.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                        Nenhum recebimento registrado para este mês.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
