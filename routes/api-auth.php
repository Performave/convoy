<?php

use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| Authentication Controller Routes
|--------------------------------------------------------------------------
|
| Endpoint: /auth
|
*/

Route::middleware('guest')->group(function () {
    Route::get('/consume-token', [Auth\LoginController::class, 'authorizeToken']);

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:login');

    Route::get('/passkeys/authentication-options', [Auth\PasskeyLoginController::class, 'create']);
    Route::post('/passkeys/verify-authentication', [Auth\PasskeyLoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});
