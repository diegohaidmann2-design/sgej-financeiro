<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Parcela extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'emprestimo_id',
        'numero_parcela',
        'valor_parcela',
        'valor_juros',
        'valor_amortizacao',
        'data_vencimento',
        'data_pagamento',
        'valor_pago',
        'multa_atraso',
        'juros_mora',
        'status',
    ];

    public function emprestimo(): BelongsTo
    {
        return $this->belongsTo(Emprestimo::class);
    }
}
