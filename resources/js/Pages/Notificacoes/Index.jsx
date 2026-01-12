import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ notificacoes }) {
    const { post } = useForm();

    const marcarLida = (id) => post(route('notificacoes.lida', id));
    const limparTudo = () => {
        if (confirm('Deseja remover todas as notificações?')) {
            post(route('notificacoes.limpar'));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Central de Notificações" />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Notificações</h1>
                    <p className="text-slate-500">Alertas do sistema, vencimentos e atividades.</p>
                </div>
                <button onClick={limparTudo} className="text-slate-400 hover:text-rose-600 font-bold text-sm uppercase tracking-widest transition">
                    Limpar Tudo
                </button>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
                {notificacoes.map(notif => (
                    <div key={notif.id} className={`p-6 rounded-3xl border transition-all duration-300 flex items-start gap-6 ${
                        notif.lida ? 'bg-white border-slate-100 opacity-60' : 'bg-white border-blue-100 shadow-lg shadow-blue-50'
                    }`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            notif.tipo === 'warning' ? 'bg-amber-50 text-amber-600' :
                            notif.tipo === 'danger' ? 'bg-rose-50 text-rose-600' :
                            'bg-blue-50 text-blue-600'
                        }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-black text-slate-800">{notif.titulo}</h3>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(notif.created_at).toLocaleString('pt-BR')}</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">{notif.mensagem}</p>
                            {!notif.lida && (
                                <button onClick={() => marcarLida(notif.id)} className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-800 transition">
                                    Marcar como lida
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {notificacoes.length === 0 && (
                    <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                        <p className="text-slate-400 font-medium">Você não tem novas notificações.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
