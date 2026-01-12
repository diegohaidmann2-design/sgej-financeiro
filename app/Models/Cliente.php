<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nome',
        'cpf_cnpj',
        'endereco',
        'telefone',
        'email',
        'dados_bancarios',
        'status',
    ];

    public function emprestimos(): HasMany
    {
        return $this->hasMany(Emprestimo::class);
    }
}
