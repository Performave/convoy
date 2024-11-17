<?php

namespace App\Actions\Auth;

use App\Models\User;
use App\Services\Auth\PasskeySerializer;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Webauthn\Exception\InvalidDataException;
use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialDescriptor;
use Webauthn\PublicKeyCredentialRpEntity;
use Webauthn\PublicKeyCredentialUserEntity;

class GeneratePasskeyRegisterOptionsAction
{
    /**
     * @throws InvalidDataException
     */
    public function execute(
        User $user,
        bool $asJson = true,
    ): string|PublicKeyCredentialCreationOptions {
        /** @var PublicKeyCredentialDescriptor[] $excludeCredentials */
        $excludeCredentials = $user->passkeys->map(function ($passkey) {
            return $passkey->publicKeyCredentialDescriptor();
        })->toArray();

        $options = new PublicKeyCredentialCreationOptions(
            rp: $this->relatedPartyEntity(),
            user: $this->generateUserEntity($user),
            challenge: $this->challenge(),
            excludeCredentials: $excludeCredentials
        );

        if ($asJson) {
            $options = PasskeySerializer::make()->toJson($options);
        }

        return $options;
    }

    protected function relatedPartyEntity(): PublicKeyCredentialRpEntity
    {
        return new PublicKeyCredentialRpEntity(
            name: Config::get('passkeys.relying_party.name'),
            id: Config::get('passkeys.relying_party.id'),
            icon: Config::get('passkeys.relying_party.icon'),
        );
    }

    /**
     * @throws InvalidDataException
     */
    public function generateUserEntity(User $user): PublicKeyCredentialUserEntity
    {
        return new PublicKeyCredentialUserEntity(
            name: $user->email,
            id: $user->uuid,
            displayName: $user->name,
        );
    }

    protected function challenge(): string
    {
        return Str::random();
    }
}
