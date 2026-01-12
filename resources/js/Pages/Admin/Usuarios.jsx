import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Usuarios({ usuarios }) {
    return (
        <AuthenticatedLayout>
            <Head title="Gestão de Usuários" />
            
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900">Gestão de Usuários</h1>
                <p className="text-slate-500 font-medium">Controle de acesso e permissões da plataforma.</p>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Usuário</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {usuarios.data.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-black text-slate-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-slate-500">{user.email}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">Ativo</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        {user.is_admin ? (
                                            <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase">Admin</span>
                                        ) : (
                                            <span className="px-4 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase">Usuário</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <button className="text-blue-600 font-black text-xs uppercase hover:underline">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
