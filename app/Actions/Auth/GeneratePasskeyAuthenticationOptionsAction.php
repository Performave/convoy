<?php

namespace App\Actions\Auth;

use App\Models\User;
use App\Services\Auth\PasskeySerializer;
use Illuminate\Support\Str;
use Webauthn\PublicKeyCredentialRequestOptions;

class GeneratePasskeyAuthenticationOptionsAction
{
    public function execute(?User $user = null): string
    {
        $allowedCredentials = [];

        if ($user) {
            $allowedCredentials = $user->passkeys->map(function ($passkey) {
                return $passkey->publicKeyCredentialDescriptor();
            })->toArray();
        }

        $options = new PublicKeyCredentialRequestOptions(
            challenge: Str::random(),
            rpId: parse_url(config('app.url'), PHP_URL_HOST),
            allowCredentials: $allowedCredentials,
            userVerification: PublicKeyCredentialRequestOptions::USER_VERIFICATION_REQUIREMENT_REQUIRED,
        );

        $options = PasskeySerializer::make()->toJson($options);

        return $options;
    }
}
