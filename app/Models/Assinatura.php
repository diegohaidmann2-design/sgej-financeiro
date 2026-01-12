<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assinatura extends Model
{
    protected $fillable = ['user_id', 'plano_id', 'vencimento_em', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plano()
    {
        return $this->belongsTo(Plano::class);
    }
}
