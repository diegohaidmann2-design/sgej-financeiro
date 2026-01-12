import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ cliente }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        cliente_id: cliente.id,
        valor_principal: '',
        taxa_juros: '',
        prazo_meses: '',
        metodo_calculo: 'simples',
        data_inicio: new Date().toISOString().split('T')[0],
    });

    const submitEmprestimo = (e) => {
        e.preventDefault();
        post(route('emprestimos.store'), { onSuccess: () => reset() });
    };

    const handlePagamento = (parcelaId, valor) => {
        if (confirm(`Confirmar pagamento da parcela no valor de R$ ${valor}?`)) {
            post(route('parcelas.pagar', parcelaId), {
                data: {
                    valor_pago: valor,
                    data_pagamento: new Date().toISOString().split('T')[0]
                }
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Cliente: ${cliente.nome}`} />
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">{cliente.nome}</h1>
                    <p className="text-slate-500">Perfil detalhado e gestão de contratos.</p>
                </div>
                <Link href={route('clientes.index')} className="text-slate-500 hover:text-blue-600 font-bold flex items-center transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Voltar para Lista
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-black mb-6 border-b pb-4">Informações Gerais</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Documento</p>
                            <p className="font-bold text-slate-700">{cliente.cpf_cnpj}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">E-mail</p>
                            <p className="font-bold text-slate-700">{cliente.email || 'Não informado'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Telefone</p>
                            <p className="font-bold text-slate-700">{cliente.telefone || 'Não informado'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status da Conta</p>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mt-1 ${
                                cliente.status === 'ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                                {cliente.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-black mb-6 border-b pb-4">Novo Empréstimo</h2>
                    <form onSubmit={submitEmprestimo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Valor Principal</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 font-bold">R$</span>
                                <input type="number" step="0.01" value={data.valor_principal} onChange={e => setData('valor_principal', e.target.value)} className="w-full border-slate-200 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-blue-500 transition" placeholder="0,00" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Taxa de Juros (% mensal)</label>
                            <input type="number" step="0.01" value={data.taxa_juros} onChange={e => setData('taxa_juros', e.target.value)} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 transition" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Prazo (meses)</label>
                            <input type="number" value={data.prazo_meses} onChange={e => setData('prazo_meses', e.target.value)} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 transition" placeholder="12" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Método de Cálculo</label>
                            <select value={data.metodo_calculo} onChange={e => setData('metodo_calculo', e.target.value)} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 transition">
                                <option value="simples">Juros Simples</option>
                                <option value="price">Tabela Price</option>
                                <option value="sac">SAC</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" disabled={processing} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center justify-center">
                                {processing && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>}
                                Gerar Novo Empréstimo
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-black mb-6">Histórico de Empréstimos</h2>
                {cliente.emprestimos.length === 0 && (
                    <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400">
                        Nenhum empréstimo registrado para este cliente.
                    </div>
                )}
                {cliente.emprestimos.map(emp => (
                    <div key={emp.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-8 overflow-hidden">
                        <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="font-black text-lg text-slate-800">Empréstimo #{emp.id}</h3>
                                <p className="text-sm text-slate-500">Valor Principal: <span className="font-bold text-slate-900">R$ {parseFloat(emp.valor_principal).toLocaleString('pt-BR')}</span></p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <a 
                                    href={route('emprestimos.contrato', emp.id)} 
                                    target="_blank" 
                                    className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition flex items-center shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Contrato PDF
                                </a>
                                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-1 rounded-md font-black uppercase tracking-widest">Sistema: {emp.metodo_calculo}</span>
                                <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase tracking-widest ${emp.status === 'quitado' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {emp.status}
                                </span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-white text-slate-400 border-b border-slate-100">
                                        <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Parc.</th>
                                        <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Vencimento</th>
                                        <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Valor</th>
                                        <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Juros</th>
                                        <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Status</th>
                                        <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {emp.parcelas.map(parc => (
                                        <tr key={parc.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4 font-bold text-slate-400">{parc.numero_parcela}</td>
                                            <td className="px-6 py-4 font-medium">{new Date(parc.data_vencimento).toLocaleDateString('pt-BR')}</td>
                                            <td className="px-6 py-4 font-black text-slate-900">R$ {parseFloat(parc.valor_parcela).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-slate-500">R$ {parseFloat(parc.valor_juros).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                                                    parc.status === 'pago' ? 'bg-emerald-50 text-emerald-600' : 
                                                    parc.status === 'atrasado' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                                                }`}>
                                                    {parc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {parc.status !== 'pago' && (
                                                    <button 
                                                        onClick={() => handlePagamento(parc.id, parc.valor_parcela)}
                                                        className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition shadow-sm"
                                                    >
                                                        Baixar Parcela
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
