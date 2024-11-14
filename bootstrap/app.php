<?php

use App\Http\Middleware\AdminAuthenticate;
use App\Http\Middleware\Coterm\CotermAuthenticate;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders()
    ->withRouting(
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
        then: function () {
            Route::middleware('web')->group(function () {
                Route::middleware('guest')->group(base_path('routes/auth.php'));

                Route::middleware(['auth.session'])
                    ->group(base_path('routes/base.php'));

                Route::middleware(['auth'])->prefix('/api/client')
                    ->as('client.')
                    ->scopeBindings()
                    ->group(base_path('routes/api-client.php'));

                Route::middleware(['auth', AdminAuthenticate::class])
                    ->prefix('/api/admin')
                    ->as('admin.')
                    ->scopeBindings()
                    ->group(base_path('routes/api-admin.php'));
            });

            Route::middleware(['api'])->group(function () {
                Route::middleware(['auth:sanctum'])
                    ->prefix('/api/application')
                    ->as('application.')
                    ->scopeBindings()
                    ->group(base_path('routes/api-application.php'));

                Route::middleware([CotermAuthenticate::class])
                    ->prefix('/api/coterm')
                    ->as('coterm.')
                    ->scopeBindings()
                    ->group(base_path('routes/api-coterm.php'));
            });
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
