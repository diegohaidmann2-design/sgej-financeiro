<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plano extends Model
{
    protected $fillable = ['nome', 'slug', 'preco', 'limite_clientes', 'limite_emprestimos', 'ativo'];
}
