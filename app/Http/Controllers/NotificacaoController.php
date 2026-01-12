<?php

namespace App\Http\Controllers;

use App\Models\Notificacao;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class NotificacaoController extends Controller
{
    public function index()
    {
        $notificacoes = Notificacao::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Notificacoes/Index', [
            'notificacoes' => $notificacoes
        ]);
    }

    public function marcarLida($id)
    {
        $notificacao = Notificacao::where('user_id', Auth::id())->findOrFail($id);
        $notificacao->update(['lida' => true]);
        return back();
    }

    public function limparTudo()
    {
        Notificacao::where('user_id', Auth::id())->delete();
        return back();
    }
}
