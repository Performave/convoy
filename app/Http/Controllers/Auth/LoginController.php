<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\Service\Api\InvalidJWTException;
use App\Models\User;
use App\Services\Api\JWTService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class LoginController
{
    public function __construct(private JWTService $JWTService) {}

    public function authorizeToken(Request $request)
    {
        try {
            $token = $this->JWTService->decode(config('app.url'), $request->token);
        } catch (InvalidJWTException) {
            throw new UnauthorizedHttpException('', 'Invalid JWT token');
        }

        /** @var User $user */
        $user = User::where('uuid', '=', $token->claims()->get('user_uuid'))->first();

        if (! $user) {
            throw new UnauthorizedHttpException('', 'Invalid JWT claims');
        }

        Auth::loginUsingId($user->id);

        $request->session()->regenerate();

        return redirect()->route('index');
    }
}
