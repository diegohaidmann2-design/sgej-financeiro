import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Maintenance() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 font-sans">
            <Head title="Sistema em Manutenção" />
            
            <div className="max-w-2xl w-full text-center">
                <div className="w-24 h-24 bg-rose-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">Estamos em Manutenção</h1>
                <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">
                    O SGEJ está passando por uma atualização de infraestrutura para melhorar sua experiência. Voltaremos em breve com novidades.
                </p>
                
                <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10">
                    <p className="text-slate-500 text-sm font-black uppercase tracking-widest mb-4">Área Administrativa</p>
                    <Link href="/login" className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-100 transition">
                        Acessar como Admin
                    </Link>
                </div>
            </div>
        </div>
    );
}
