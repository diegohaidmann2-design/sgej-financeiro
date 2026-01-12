import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50">
            <Head title="Criar Conta" />

            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-xl rounded-2xl border border-slate-100">
                <div className="mb-8 text-center">
                    <Link href="/" className="text-3xl font-black text-blue-600 tracking-tight">SGEJ</Link>
                    <h2 className="text-xl font-bold text-slate-900 mt-4">Crie sua conta</h2>
                    <p className="text-slate-500 text-sm">Comece a gerenciar seus empréstimos hoje.</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nome Completo</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                        {errors.name && <div className="text-rose-500 text-xs mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">E-mail</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                        {errors.email && <div className="text-rose-500 text-xs mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Senha</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                        {errors.password && <div className="text-rose-500 text-xs mt-1">{errors.password}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Confirmar Senha</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                        {errors.password_confirmation && <div className="text-rose-500 text-xs mt-1">{errors.password_confirmation}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                        Registrar Conta
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-600">
                            Já tem uma conta?{' '}
                            <Link href={route('login')} className="text-blue-600 font-bold hover:underline">
                                Entrar
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
