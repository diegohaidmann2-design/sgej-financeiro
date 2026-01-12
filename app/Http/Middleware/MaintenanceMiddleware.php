<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MaintenanceMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $maintenance = Setting::get('modo_manutencao', 'false');

        if ($maintenance === 'true') {
            if (!Auth::check() || !Auth::user()->is_admin) {
                if (!$request->is('login') && !$request->is('logout') && !$request->is('admin/*')) {
                    return Inertia::render('Errors/Maintenance');
                }
            }
        }

        return $next($request);
    }
}
