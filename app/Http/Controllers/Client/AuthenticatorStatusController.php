<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthenticatorStatusController extends Controller
{
    public function __invoke(Request $request)
    {
        return response()->json([
            'enabled' => $request->user()->two_factor_secret !== null,
        ]);
    }
}
