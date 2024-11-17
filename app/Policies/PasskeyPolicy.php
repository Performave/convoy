<?php

namespace App\Policies;

use App\Models\Passkey;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PasskeyPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Passkey $passkey): Response
    {
        return $user->id === $passkey->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
