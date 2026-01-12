<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index(Request $request)
    {
        $query = Cliente::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nome', 'like', "%{$search}%")
                  ->orWhere('cpf_cnpj', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Clientes/Index', [
            'clientes' => $query->orderBy('nome')->paginate(15)->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|min:3|max:255',
            'cpf_cnpj' => 'required|string|unique:clientes,cpf_cnpj',
            'email' => 'nullable|email|max:255',
            'telefone' => 'nullable|string|max:20',
            'endereco' => 'nullable|string|max:500',
            'dados_bancarios' => 'nullable|string|max:1000',
        ]);

        Cliente::create($validated);

        return redirect()->route('clientes.index')->with('message', 'Cliente cadastrado com sucesso!');
    }

    public function show(Cliente $cliente)
    {
        return Inertia::render('Clientes/Show', [
            'cliente' => $cliente->load(['emprestimos' => function($q) {
                $q->orderByDesc('created_at');
            }, 'emprestimos.parcelas'])
        ]);
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete();
        return redirect()->route('clientes.index')->with('message', 'Cliente removido com sucesso!');
    }
}
