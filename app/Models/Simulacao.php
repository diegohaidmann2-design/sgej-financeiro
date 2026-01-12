<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Simulacao extends Model
{
    protected $table = 'simulacoes';
    protected $fillable = ['user_id', 'nome_proposta', 'valor_principal', 'taxa_juros', 'prazo_meses', 'metodo_calculo', 'detalhes_parcelas'];
    protected $casts = ['detalhes_parcelas' => 'array'];

    public function user() { return $this->belongsTo(User::class); }
}
