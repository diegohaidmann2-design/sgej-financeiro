import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Settings({ settings }) {
    const { data, setData, post, processing } = useForm({
        settings: {
            smtp_host: settings.email?.find(s => s.key === 'smtp_host')?.value || '',
            smtp_port: settings.email?.find(s => s.key === 'smtp_port')?.value || '',
            checkout_api_key: settings.checkout?.find(s => s.key === 'checkout_api_key')?.value || '',
            modo_manutencao: settings.sistema?.find(s => s.key === 'modo_manutencao')?.value || 'false',
        },
        group: 'geral'
    });

    const submit = (e, group) => {
        e.preventDefault();
        setData('group', group);
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Configurações do Sistema" />
            
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900">Configurações de Infraestrutura</h1>
                <p className="text-slate-500 font-medium">Gerencie SMTP, Checkout e estados do servidor.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SMTP Settings */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-6">Servidor de E-mail (SMTP)</h2>
                    <form onSubmit={(e) => submit(e, 'email')} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Host SMTP</label>
                            <input type="text" value={data.settings.smtp_host} onChange={e => setData('settings', {...data.settings, smtp_host: e.target.value})} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="smtp.mailtrap.io" />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Porta</label>
                            <input type="text" value={data.settings.smtp_port} onChange={e => setData('settings', {...data.settings, smtp_port: e.target.value})} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="2525" />
                        </div>
                        <button type="submit" disabled={processing} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition">Salvar E-mail</button>
                    </form>
                </div>

                {/* Checkout Settings */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-6">Configurações de Checkout</h2>
                    <form onSubmit={(e) => submit(e, 'checkout')} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">API Key (Gateway)</label>
                            <input type="password" value={data.settings.checkout_api_key} onChange={e => setData('settings', {...data.settings, checkout_api_key: e.target.value})} className="w-full border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="sk_test_..." />
                        </div>
                        <button type="submit" disabled={processing} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition">Salvar Checkout</button>
                    </form>
                </div>

                {/* Maintenance Mode */}
                <div className="bg-rose-50 p-10 rounded-[3rem] border border-rose-100 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-rose-600 mb-2">Modo Manutenção (Kill Switch)</h2>
                            <p className="text-rose-400 font-medium">Ao ativar, apenas administradores poderão acessar o sistema.</p>
                        </div>
                        <button 
                            onClick={() => {
                                const newVal = data.settings.modo_manutencao === 'true' ? 'false' : 'true';
                                setData('settings', {...data.settings, modo_manutencao: newVal});
                                // Trigger auto-save for maintenance
                            }}
                            className={`px-10 py-5 rounded-2xl font-black transition ${data.settings.modo_manutencao === 'true' ? 'bg-rose-600 text-white' : 'bg-white text-rose-600 border border-rose-200'}`}
                        >
                            {data.settings.modo_manutencao === 'true' ? 'DESATIVAR MANUTENÇÃO' : 'ATIVAR MANUTENÇÃO'}
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
