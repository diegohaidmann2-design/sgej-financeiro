<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && (bool)Auth::user()->is_admin === true) {
            return $next($request);
        }

        return redirect('/dashboard')->with('error', 'Acesso negado. Área restrita a administradores.');
    }
}
