<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RelatorioController;
use App\Http\Controllers\SimulacaoController;
use App\Http\Controllers\PagamentoController;
use App\Http\Controllers\IAController;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\ContratoController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('clientes', 'App\Http\Controllers\ClienteController');
    Route::get('emprestimos', 'App\Http\Controllers\EmprestimoController@index')->name('emprestimos.index');
    Route::post('emprestimos', 'App\Http\Controllers\EmprestimoController@store')->name('emprestimos.store');
    Route::get('emprestimos/{emprestimo}/contrato', 'App\Http\Controllers\EmprestimoController@gerarContrato')->name('emprestimos.contrato');
    Route::post('parcelas/{parcela}/pagar', 'App\Http\Controllers\ParcelaController@pagar')->name('parcelas.pagar');
    Route::get('relatorios', [RelatorioController::class, 'index'])->name('relatorios.index');
    Route::get('relatorios/pdf', [RelatorioController::class, 'exportarPdf'])->name('relatorios.pdf');
    Route::get('simulacao', [SimulacaoController::class, 'index'])->name('simulacao.index');
    Route::post('simulacao/calcular', [SimulacaoController::class, 'calcular'])->name('simulacao.calcular');
    Route::get('pagamentos', [PagamentoController::class, 'index'])->name('pagamentos.index');
    Route::post('pagamentos/{id}/estornar', [PagamentoController::class, 'estornar'])->name('pagamentos.estornar');
    Route::get('ia', [IAController::class, 'index'])->name('ia.index');
    Route::post('ia/chat', [IAController::class, 'chat'])->name('ia.chat');
    Route::get('notificacoes', [NotificacaoController::class, 'index'])->name('notificacoes.index');
    Route::post('notificacoes/{id}/lida', [NotificacaoController::class, 'marcarLida'])->name('notificacoes.lida');
    Route::post('notificacoes/limpar', [NotificacaoController::class, 'limparTudo'])->name('notificacoes.limpar');
    Route::get('contratos', [ContratoController::class, 'index'])->name('contratos.index');
    Route::get('ajuda/metodos', function () {
        return Inertia::render('Ajuda/Metodos');
    })->name('ajuda.metodos');

    // Admin Routes
    Route::middleware(['App\Http\Middleware\AdminMiddleware'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/usuarios', [App\Http\Controllers\Admin\AdminController::class, 'usuarios'])->name('usuarios');
        Route::get('/planos', [App\Http\Controllers\Admin\AdminController::class, 'planos'])->name('planos');
        Route::get('/settings', [App\Http\Controllers\Admin\AdminController::class, 'settings'])->name('settings');
        Route::post('/settings', [App\Http\Controllers\Admin\AdminController::class, 'updateSettings'])->name('settings.update');
    });
});

require __DIR__.'/auth.php';
