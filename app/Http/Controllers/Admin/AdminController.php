<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Plano;
use App\Models\Assinatura;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_usuarios' => User::count(),
                'total_assinaturas' => Assinatura::where('status', 'ativo')->count(),
                'receita_mensal' => Assinatura::join('planos', 'assinaturas.plano_id', '=', 'planos.id')
                    ->where('assinaturas.status', 'ativo')
                    ->sum('planos.preco'),
                'novos_usuarios_hoje' => User::whereDate('created_at', today())->count(),
            ]
        ]);
    }

    public function usuarios()
    {
        return Inertia::render('Admin/Usuarios', [
            'usuarios' => User::with('assinatura.plano')->latest()->paginate(10)
        ]);
    }

    public function planos()
    {
        return Inertia::render('Admin/Planos', [
            'planos' => Plano::all()
        ]);
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => Setting::all()->groupBy('group')
        ]);
    }

    public function updateSettings(Request $request)
    {
        foreach ($request->settings as $key => $value) {
            Setting::set($key, $value, $request->group ?? 'geral');
        }
        return back()->with('success', 'Configurações atualizadas com sucesso!');
    }
}
