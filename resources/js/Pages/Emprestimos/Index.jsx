import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ emprestimos, clientes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        cliente_id: '',
        valor_principal: '',
        taxa_juros: '',
        prazo_meses: '',
        metodo_calculo: 'simples',
        data_inicio: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('emprestimos.store'), {
            onSuccess: () => {
                reset();
                document.getElementById('modal-emprestimo').close();
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestão de Empréstimos" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 lg:mb-10 gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Carteira de Empréstimos</h1>
                    <p className="text-slate-500 font-medium text-sm lg:text-base">Visão geral de todos os contratos ativos e quitados.</p>
                </div>
                <button onClick={() => document.getElementById('modal-emprestimo').showModal()} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center text-sm uppercase tracking-widest">
                    Novo Empréstimo
                </button>
            </div>

            <div className="bg-white rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 lg:p-8 border-b border-slate-100 bg-slate-50/30">
                    <h2 className="text-lg lg:text-xl font-black text-slate-800">Contratos Registrados</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Principal</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Taxa</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {emprestimos.data.map(e => (
                                <tr key={e.id} className="hover:bg-slate-50/80 transition group">
                                    <td className="px-6 lg:px-8 py-5 font-bold text-slate-400 text-sm">#{e.id}</td>
                                    <td className="px-6 lg:px-8 py-5">
                                        <div className="font-bold text-slate-900 text-sm lg:text-base">{e.cliente.nome}</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">{e.metodo_calculo}</div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-5 font-black text-slate-900 text-base lg:text-lg">R$ {parseFloat(e.valor_principal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td className="px-6 lg:px-8 py-5 font-medium text-slate-600 text-sm">{e.taxa_juros}% am</td>
                                    <td className="px-6 lg:px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            e.status === 'quitado' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                            {e.status}
                                        </span>
                                    </td>
                                    <td className="px-6 lg:px-8 py-5 text-right">
                                        <Link href={route('clientes.show', e.cliente_id)} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-black text-[10px] uppercase tracking-widest transition">
                                            Gerenciar →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {emprestimos.data.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-slate-400 italic font-medium">Nenhum empréstimo encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Novo Empréstimo */}
            <dialog id="modal-emprestimo" className="modal p-4 lg:p-0 rounded-[2rem] lg:rounded-3xl shadow-2xl border-none bg-transparent backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm">
                <div className="bg-white w-full max-w-2xl overflow-hidden rounded-[2rem] lg:rounded-3xl">
                    <div className="p-6 lg:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-lg lg:text-xl font-black">Novo Empréstimo</h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-slate-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <form onSubmit={submit} className="p-6 lg:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selecionar Cliente</label>
                                <select 
                                    value={data.cliente_id} 
                                    onChange={e => setData('cliente_id', e.target.value)} 
                                    required 
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                                >
                                    <option value="">Selecione um cliente...</option>
                                    {clientes.map(c => (
                                        <option key={c.id} value={c.id}>{c.nome}</option>
                                    ))}
                                </select>
                                {errors.cliente_id && <div className="text-rose-500 text-[10px] font-black uppercase">{errors.cliente_id}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Principal (R$)</label>
                                <input 
                                    type="number" 
                                    step="0.01" 
                                    value={data.valor_principal} 
                                    onChange={e => setData('valor_principal', e.target.value)} 
                                    required 
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.valor_principal && <div className="text-rose-500 text-[10px] font-black uppercase">{errors.valor_principal}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taxa de Juros (% am)</label>
                                <input 
                                    type="number" 
                                    step="0.1" 
                                    value={data.taxa_juros} 
                                    onChange={e => setData('taxa_juros', e.target.value)} 
                                    required 
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.taxa_juros && <div className="text-rose-500 text-[10px] font-black uppercase">{errors.taxa_juros}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prazo (Meses)</label>
                                <input 
                                    type="number" 
                                    value={data.prazo_meses} 
                                    onChange={e => setData('prazo_meses', e.target.value)} 
                                    required 
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.prazo_meses && <div className="text-rose-500 text-[10px] font-black uppercase">{errors.prazo_meses}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Método de Cálculo</label>
                                <select 
                                    value={data.metodo_calculo} 
                                    onChange={e => setData('metodo_calculo', e.target.value)} 
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                                >
                                    <option value="simples">Juros Simples</option>
                                    <option value="composto">Juros Compostos</option>
                                    <option value="price">Tabela Price</option>
                                    <option value="sac">SAC</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Início</label>
                                <input 
                                    type="date" 
                                    value={data.data_inicio} 
                                    onChange={e => setData('data_inicio', e.target.value)} 
                                    required 
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-xl shadow-blue-100 disabled:opacity-50">
                                {processing ? 'Gerando Parcelas...' : 'Criar Empréstimo'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </AuthenticatedLayout>
    );
}
