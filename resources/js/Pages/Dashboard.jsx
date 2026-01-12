import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, proximosVencimentos }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Gerencial" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-10 gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Painel de Controle</h1>
                    <p className="text-slate-500 font-medium text-sm lg:text-base">Bem-vindo ao centro de comando do SGEJ.</p>
                </div>
                <div className="flex gap-3">
                    <Link href={route('clientes.index')} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center text-sm uppercase tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                        Novo Cliente
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12">
                <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform hidden sm:block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Emprestado</p>
                    <p className="text-2xl lg:text-3xl font-black text-slate-900">R$ {stats.totalEmprestado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <div className="mt-4 flex items-center text-xs font-bold text-blue-600">
                        <span>{stats.totalClientes} clientes ativos</span>
                    </div>
                </div>
                
                <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform hidden sm:block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lucro Recebido</p>
                    <p className="text-2xl lg:text-3xl font-black text-emerald-600">R$ {stats.totalJurosRecebidos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <div className="mt-4 flex items-center text-xs font-bold text-slate-400">
                        <span>Projetado: R$ {stats.lucroProjetado.toLocaleString('pt-BR')}</span>
                    </div>
                </div>

                <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform hidden sm:block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Inadimplência</p>
                    <p className="text-2xl lg:text-3xl font-black text-rose-600">{stats.taxaInadimplencia}%</p>
                    <div className="mt-4 flex items-center text-xs font-bold text-rose-400">
                        <span>Atenção necessária</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 lg:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/30">
                    <h2 className="text-lg lg:text-xl font-black text-slate-800">Próximos Vencimentos</h2>
                    <Link href={route('pagamentos.index')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition">Ver todos →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-white">
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vencimento</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor da Parcela</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {proximosVencimentos.map(venc => (
                                <tr key={venc.id} className="hover:bg-slate-50/80 transition group">
                                    <td className="px-6 lg:px-8 py-5">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 group-hover:animate-ping"></div>
                                            <span className="font-bold text-slate-700 text-sm">{new Date(venc.data_vencimento).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-5 font-medium text-slate-600 text-sm">{venc.emprestimo.cliente.nome}</td>
                                    <td className="px-6 lg:px-8 py-5">
                                        <span className="text-base lg:text-lg font-black text-slate-900">R$ {parseFloat(venc.valor_parcela).toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 lg:px-8 py-5 text-right">
                                        <Link href={route('clientes.show', venc.emprestimo.cliente_id)} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition shadow-lg shadow-slate-200">
                                            Gerenciar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {proximosVencimentos.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                        Nenhum vencimento pendente para os próximos dias.
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
