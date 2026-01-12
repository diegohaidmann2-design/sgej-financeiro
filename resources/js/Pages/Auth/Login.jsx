import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50">
            <Head title="Entrar" />

            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-xl rounded-2xl border border-slate-100">
                <div className="mb-8 text-center">
                    <Link href="/" className="text-3xl font-black text-blue-600 tracking-tight">SGEJ</Link>
                    <h2 className="text-xl font-bold text-slate-900 mt-4">Bem-vindo de volta</h2>
                    <p className="text-slate-500 text-sm">Entre com suas credenciais para acessar o painel.</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit} className="space-y-6">
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

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-slate-600">Lembrar de mim</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                        Entrar no Sistema
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-600">
                            Não tem uma conta?{' '}
                            <Link href={route('register')} className="text-blue-600 font-bold hover:underline">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
