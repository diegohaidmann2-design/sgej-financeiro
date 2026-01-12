<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContratoController extends Controller
{
    public function index()
    {
        $contratos = Emprestimo::with('cliente')
            ->orderByDesc('created_at')
            ->paginate(15);

        return Inertia::render('Contratos/Index', [
            'contratos' => $contratos
        ]);
    }
}
