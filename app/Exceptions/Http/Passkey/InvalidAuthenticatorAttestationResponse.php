<?php

namespace App\Exceptions\Http\Passkey;

use App\Exceptions\DisplayException;
use Throwable;

class InvalidAuthenticatorAttestationResponse extends DisplayException
{
    public function __construct(Throwable $exception)
    {
        parent::__construct(
            'The given passkey could not be validated. Please check the format and try again.',
            previous: $exception
        );
    }
}
