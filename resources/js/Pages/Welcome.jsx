import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Head title="Bem-vindo ao SGEJ" />
            
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">SGEJ</span>
                            <span className="ml-2 text-slate-500 font-medium hidden sm:block">| Gestão de Empréstimos</span>
                        </div>
                        <div className="flex space-x-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                                    Acessar Painel
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-slate-600 hover:text-blue-600 font-semibold px-3 py-2 transition">
                                        Entrar
                                    </Link>
                                    <Link href={route('register')} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                                        Começar Agora
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main>
                <div className="relative overflow-hidden py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
                                Controle seus empréstimos com <span className="text-blue-600">precisão cirúrgica.</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                                Uma plataforma completa para gerenciar clientes, calcular juros (Price, SAC, Simples) e acompanhar pagamentos em tempo real.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href={route('register')} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl hover:shadow-blue-200">
                                    Criar Minha Conta Grátis
                                </Link>
                                <a href="#features" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition shadow-sm">
                                    Ver Funcionalidades
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 pointer-events-none">
                        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition group">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Cálculos Inteligentes</h3>
                                <p className="text-slate-600">Suporte completo para Tabela Price, SAC e Juros Simples. Resultados precisos em segundos.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition group">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Gestão de Clientes</h3>
                                <p className="text-slate-600">Histórico completo de empréstimos, status de inadimplência e dados de contato centralizados.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition group">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Dashboard Financeiro</h3>
                                <p className="text-slate-600">Indicadores de lucratividade, fluxo de caixa e alertas de vencimento em um só lugar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="mb-4 font-bold text-white">SGEJ - Sistema de Gestão de Empréstimos e Juros</p>
                    <p>© 2026 Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
