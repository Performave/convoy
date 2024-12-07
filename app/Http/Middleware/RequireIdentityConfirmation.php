<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class RequireIdentityConfirmation
{
    public function handle(Request $request, Closure $next)
    {
        if (time() - $request->session()->get('auth.identity_confirmed_at', 0) > 300) {
            throw new AccessDeniedHttpException('Your identity must be confirmed to access this resource.');
        }

        return $next($request);
    }
}
