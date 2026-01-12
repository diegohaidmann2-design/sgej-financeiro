import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const cards = [
        { name: 'Total de Usuários', value: stats.total_usuarios, icon: 'users', color: 'blue' },
        { name: 'Assinaturas Ativas', value: stats.total_assinaturas, icon: 'credit-card', color: 'emerald' },
        { name: 'Receita Mensal Est.', value: `R$ ${stats.receita_mensal.toLocaleString('pt-BR')}`, icon: 'trending-up', color: 'indigo' },
        { name: 'Novos Hoje', value: stats.novos_usuarios_hoje, icon: 'user-plus', color: 'amber' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Admin Command Center" />
            
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900">Admin Command Center</h1>
                <p className="text-slate-500 font-medium">Gestão global da plataforma SGEJ.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{card.name}</p>
                        <p className={`text-3xl font-black text-${card.color}-600`}>{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
                    <h2 className="text-2xl font-black mb-6">Status do Sistema</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                            <span className="font-bold">Modo Manutenção</span>
                            <span className="px-4 py-1 bg-rose-500/20 text-rose-400 rounded-full text-xs font-black uppercase">Desativado</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                            <span className="font-bold">Servidor SMTP</span>
                            <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase">Conectado</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                            <span className="font-bold">Gateway de Pagamento</span>
                            <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase">Operacional</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-black text-slate-800 mb-6">Ações Rápidas</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-6 bg-slate-50 rounded-3xl hover:bg-blue-50 transition group text-left">
                            <p className="font-black text-slate-800 group-hover:text-blue-600">Gerenciar Usuários</p>
                            <p className="text-xs text-slate-400">Ver lista completa</p>
                        </button>
                        <button className="p-6 bg-slate-50 rounded-3xl hover:bg-blue-50 transition group text-left">
                            <p className="font-black text-slate-800 group-hover:text-blue-600">Configurar Planos</p>
                            <p className="text-xs text-slate-400">Editar preços e limites</p>
                        </button>
                        <button className="p-6 bg-slate-50 rounded-3xl hover:bg-blue-50 transition group text-left">
                            <p className="font-black text-slate-800 group-hover:text-blue-600">Logs do Sistema</p>
                            <p className="text-xs text-slate-400">Ver auditoria</p>
                        </button>
                        <button className="p-6 bg-rose-50 rounded-3xl hover:bg-rose-100 transition group text-left">
                            <p className="font-black text-rose-600">Manutenção</p>
                            <p className="text-xs text-rose-400">Ativar Kill Switch</p>
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
