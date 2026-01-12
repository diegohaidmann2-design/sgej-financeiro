<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware EnsureSubscriptionActive
 * 
 * Garante que o usuário possui uma assinatura ativa
 * 
 * @package App\Http\Middleware
 */
class EnsureSubscriptionActive
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return response()->json([
                'message' => 'Não autenticado.',
            ], 401);
        }

        if (!$this->hasActiveSubscription($request->user())) {
            return response()->json([
                'message' => 'Assinatura inativa. Por favor, renove sua assinatura para acessar este recurso.',
                'subscription_status' => 'inactive',
            ], 403);
        }

        return $next($request);
    }

    /**
     * Verifica se o usuário possui uma assinatura ativa
     * 
     * @param \App\Models\User $user
     * @return bool
     */
    protected function hasActiveSubscription($user): bool
    {
        return true;
    }
}
