import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth, url, flash } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    // Fechar menu mobile ao mudar de rota
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    const menuItems = [
        { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', route: 'dashboard' },
        { name: 'Clientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', route: 'clientes.index' },
        { name: 'Empréstimos', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', route: 'emprestimos.index' },
        { name: 'Simulação', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', route: 'simulacao.index' },
        { name: 'Pagamentos', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', route: 'pagamentos.index' },
        { name: 'Relatórios', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', route: 'relatorios.index' },
        { name: 'Contratos', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', route: 'contratos.index' },
        { name: 'Assistente IA', icon: 'M13 10V3L4 14h7v7l9-11h-7z', route: 'ia.index', special: true },
        { name: 'Notificações', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', route: 'notificacoes.index' },
        { name: 'Explicação', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', route: 'ajuda.metodos' },
    ];

    const adminMenuItems = [
        { name: 'Admin Dashboard', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4', route: 'admin.dashboard' },
        { name: 'Usuários', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', route: 'admin.usuarios' },
        { name: 'Configurações', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', route: 'admin.settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 lg:top-8 lg:right-8 z-[100] animate-in fade-in slide-in-from-right-8 duration-300 w-[calc(100%-2rem)] lg:w-auto">
                    <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${flash?.success ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${flash?.success ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        <span className="font-black text-sm uppercase tracking-tight">{flash?.success || flash?.error}</span>
                    </div>
                </div>
            )}

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-[60]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <span className="text-white font-black text-sm">S</span>
                    </div>
                    <span className="font-black text-xl tracking-tighter text-slate-900">SGEJ<span className="text-blue-600">.</span></span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Sidebar (Desktop & Mobile) */}
            <aside className={`
                fixed inset-y-0 left-0 z-[70] bg-white border-r border-slate-100 flex flex-col transition-all duration-500 ease-in-out shadow-2xl shadow-slate-100
                ${isMobileMenuOpen ? 'translate-x-0 w-80' : '-translate-x-full lg:translate-x-0'}
                ${isSidebarOpen ? 'lg:w-80' : 'lg:w-24'}
            `}>
                <div className="p-8 hidden lg:flex items-center justify-between">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <span className="text-white font-black text-xl">S</span>
                            </div>
                            <span className="font-black text-2xl tracking-tighter text-slate-900">SGEJ<span className="text-blue-600">.</span></span>
                        </div>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 px-6 space-y-2 overflow-y-auto py-4 custom-scrollbar mt-16 lg:mt-0">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={route(item.route)}
                            className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                                (url && url.startsWith('/' + item.route.split('.')[0])) || (url === '/dashboard' && item.route === 'dashboard')
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isSidebarOpen || isMobileMenuOpen ? 'mr-3' : 'mx-auto'} ${ (url && url.startsWith('/' + item.route.split('.')[0])) || (url === '/dashboard' && item.route === 'dashboard') ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {(isSidebarOpen || isMobileMenuOpen) && <span className="font-bold text-sm">{item.name}</span>}
                            {item.special && (isSidebarOpen || isMobileMenuOpen) && (
                                <span className="ml-auto flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                            )}
                        </Link>
                    ))}

                    {auth.user.is_admin && (isSidebarOpen || isMobileMenuOpen) && (
                        <div className="mt-10 pt-10 border-t border-slate-100">
                            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Administração</p>
                            {adminMenuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={route(item.route)}
                                    className={`flex items-center px-4 py-4 rounded-2xl transition-all duration-300 group mb-2 ${
                                        route().current(item.route) 
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${route().current(item.route) ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    <span className="font-bold text-sm">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>

                <div className="p-6 border-t border-slate-50">
                    <div className={`flex items-center ${(!isSidebarOpen && !isMobileMenuOpen) && 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg">
                            {auth.user.name.charAt(0)}
                        </div>
                        {(isSidebarOpen || isMobileMenuOpen) && (
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-black text-slate-900 truncate">{auth.user.name}</p>
                                <Link href={route('logout')} method="post" as="button" className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition">Sair do Sistema</Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Overlay for Mobile Menu */}
            {isMobileMenuOpen && (
                <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[65] lg:hidden animate-in fade-in duration-300"></div>
            )}

            {/* Main Content */}
            <main className={`flex-1 h-screen overflow-y-auto relative custom-scrollbar pt-16 lg:pt-0 transition-all duration-500 ${isSidebarOpen ? 'lg:pl-80' : 'lg:pl-24'}`}>
                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-[60] flex items-center justify-center animate-in fade-in duration-300">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Sincronizando...</p>
                        </div>
                    </div>
                )}

                <div className="p-4 lg:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
