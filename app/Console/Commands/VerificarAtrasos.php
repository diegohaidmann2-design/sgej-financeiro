<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Parcela;
use Carbon\Carbon;

class VerificarAtrasos extends Command
{
    protected $signature = 'sgej:verificar-atrasos';
    protected $description = 'Marca parcelas como atrasadas se o vencimento passou';

    public function handle()
    {
        $hoje = Carbon::today();
        
        $parcelas = Parcela::where('status', 'pendente')
            ->where('data_vencimento', '<', $hoje)
            ->get();

        foreach ($parcelas as $parcela) {
            $parcela->update(['status' => 'atrasado']);
            $this->info("Parcela #{$parcela->id} marcada como atrasada.");
        }

        $this->info('Verificação concluída.');
    }
}
