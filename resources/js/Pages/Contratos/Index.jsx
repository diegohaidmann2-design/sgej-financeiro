import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ contratos }) {
    return (
        <AuthenticatedLayout>
            <Head title="Gestão de Contratos" />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Repositório de Contratos</h1>
                    <p className="text-slate-500">Acesse e gere documentos jurídicos de todos os empréstimos.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <h2 className="text-xl font-black">Documentos Gerados</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Contrato</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Principal</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Emissão</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {contratos.data.map(c => (
                                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                                    <td className="px-8 py-5 font-bold text-slate-400">#CT-{c.id.toString().padStart(5, '0')}</td>
                                    <td className="px-8 py-5 font-bold text-slate-900">{c.cliente.nome}</td>
                                    <td className="px-8 py-5 font-black text-slate-900">R$ {parseFloat(c.valor_principal).toFixed(2)}</td>
                                    <td className="px-8 py-5 text-slate-500 text-sm">{new Date(c.created_at).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-8 py-5 text-right">
                                        <a 
                                            href={route('emprestimos.contrato', c.id)} 
                                            target="_blank" 
                                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition shadow-sm"
                                        >
                                            Visualizar PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {contratos.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">Nenhum contrato emitido até o momento.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
