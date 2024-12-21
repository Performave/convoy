<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update(UpdatePasswordRequest $request)
    {
        $request->user()->update([
            'password' => Hash::make($request->string('password')),
        ]);

        return response()->noContent();
    }
}
