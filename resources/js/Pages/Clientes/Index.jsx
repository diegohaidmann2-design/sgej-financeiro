import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Index({ clientes, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [cepLoading, setCepLoading] = useState(false);
    const [cep, setCep] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        nome: '',
        cpf_cnpj: '',
        email: '',
        telefone: '',
        endereco: '',
        dados_bancarios: '',
    });

    // Máscara para CPF/CNPJ
    const maskCpfCnpj = (value) => {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length <= 11) {
            return cleanValue
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            return cleanValue
                .replace(/^(\d{2})(\d)/, '$1.$2')
                .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/\.(\d{3})(\d)/, '.$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .substring(0, 18);
        }
    };

    // Máscara para Telefone
    const maskPhone = (value) => {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length <= 10) {
            return cleanValue
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return cleanValue
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .substring(0, 15);
        }
    };

    // Máscara para CEP
    const maskCep = (value) => {
        return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9);
    };

    const handleCepChange = async (e) => {
        const value = maskCep(e.target.value);
        setCep(value);

        if (value.replace(/\D/g, '').length === 8) {
            setCepLoading(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${value.replace(/\D/g, '')}/json/`);
                const result = await response.json();
                if (!result.erro) {
                    const fullAddress = `${result.logradouro}, ${result.bairro}, ${result.localidade} - ${result.uf}`;
                    setData('endereco', fullAddress);
                }
            } catch (error) {
                console.error("Erro ao buscar CEP", error);
            } finally {
                setCepLoading(false);
            }
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('clientes.index'), { search }, { preserveState: true });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('clientes.store'), { 
            onSuccess: () => {
                reset();
                setCep('');
                document.getElementById('modal-cliente').close();
            } 
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestão de Clientes" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 lg:mb-10 gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Base de Clientes</h1>
                    <p className="text-slate-500 font-medium text-sm lg:text-base">Gerencie seus tomadores de empréstimo e seus históricos.</p>
                </div>
                <button onClick={() => document.getElementById('modal-cliente').showModal()} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center text-sm uppercase tracking-widest">
                    Cadastrar Novo
                </button>
            </div>

            {/* Busca */}
            <div className="mb-8">
                <form onSubmit={handleSearch} className="relative max-w-md">
                    <input 
                        type="text" 
                        placeholder="Buscar por nome ou CPF/CNPJ..." 
                        className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 font-medium text-slate-600"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </form>
            </div>

            <div className="bg-white rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome / Documento</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contato</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {(clientes.data || clientes).map(cliente => (
                                <tr key={cliente.id} className="hover:bg-slate-50/80 transition group">
                                    <td className="px-6 lg:px-8 py-5">
                                        <div className="font-bold text-slate-900 text-sm lg:text-base">{cliente.nome}</div>
                                        <div className="text-xs text-slate-400 font-medium">{cliente.cpf_cnpj}</div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-5">
                                        <div className="text-sm text-slate-600 font-medium truncate max-w-[150px]">{cliente.email || 'N/A'}</div>
                                        <div className="text-xs text-slate-400">{cliente.telefone || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-5">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Ativo</span>
                                    </td>
                                    <td className="px-6 lg:px-8 py-5 text-right">
                                        <Link href={route('clientes.show', cliente.id)} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition">
                                            Ver Perfil
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {((clientes.data && clientes.data.length === 0) || (!clientes.data && clientes.length === 0)) && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-slate-400 italic">Nenhum cliente encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginação */}
                {clientes.links && clientes.links.length > 3 && (
                    <div className="p-6 lg:p-8 border-t border-slate-100 flex flex-wrap justify-center gap-2">
                        {clientes.links.map((link, i) => (
                            <Link 
                                key={i}
                                href={link.url}
                                className={`px-3 py-2 rounded-xl text-[10px] lg:text-xs font-black transition ${
                                    link.active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de Cadastro */}
            <dialog id="modal-cliente" className="modal p-4 lg:p-0 rounded-[2rem] lg:rounded-3xl shadow-2xl border-none bg-transparent backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm">
                <div className="bg-white w-full max-w-2xl overflow-hidden rounded-[2rem] lg:rounded-3xl">
                    <div className="p-6 lg:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-lg lg:text-xl font-black">Novo Cliente</h3>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-slate-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <form onSubmit={submit} noValidate className="p-6 lg:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                                <input 
                                    value={data.nome} 
                                    onChange={e => setData('nome', e.target.value)} 
                                    required 
                                    placeholder="Ex: João da Silva"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.nome && <div className="text-rose-500 text-[10px] font-black uppercase mt-1">{errors.nome}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CPF ou CNPJ</label>
                                <input 
                                    value={data.cpf_cnpj} 
                                    onChange={e => setData('cpf_cnpj', maskCpfCnpj(e.target.value))} 
                                    required 
                                    placeholder="000.000.000-00"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.cpf_cnpj && <div className="text-rose-500 text-[10px] font-black uppercase mt-1">{errors.cpf_cnpj}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</label>
                                <input 
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                    type="email" 
                                    placeholder="joao@exemplo.com"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.email && <div className="text-rose-500 text-[10px] font-black uppercase mt-1">{errors.email}</div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefone</label>
                                <input 
                                    value={data.telefone} 
                                    onChange={e => setData('telefone', maskPhone(e.target.value))} 
                                    placeholder="(00) 00000-0000"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.telefone && <div className="text-rose-500 text-[10px] font-black uppercase mt-1">{errors.telefone}</div>}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CEP (Busca Automática)</label>
                                <div className="relative">
                                    <input 
                                        value={cep} 
                                        onChange={handleCepChange} 
                                        placeholder="00000-000"
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                    />
                                    {cepLoading && (
                                        <div className="absolute right-3 top-3">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço Completo</label>
                                <input 
                                    value={data.endereco} 
                                    onChange={e => setData('endereco', e.target.value)} 
                                    placeholder="Rua, Número, Bairro, Cidade - UF"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" 
                                />
                                {errors.endereco && <div className="text-rose-500 text-[10px] font-black uppercase mt-1">{errors.endereco}</div>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dados Bancários / Observações</label>
                            <textarea 
                                value={data.dados_bancarios} 
                                onChange={e => setData('dados_bancarios', e.target.value)} 
                                rows="3" 
                                placeholder="Informações adicionais importantes..."
                                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                            ></textarea>
                        </div>
                        <div className="pt-4">
                            <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-xl shadow-blue-100 disabled:opacity-50">
                                {processing ? 'Processando...' : 'Finalizar Cadastro'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </AuthenticatedLayout>
    );
}
