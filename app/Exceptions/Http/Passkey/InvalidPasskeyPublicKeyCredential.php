<?php

namespace App\Exceptions\Http\Passkey;

use App\Exceptions\DisplayException;

class InvalidPasskeyPublicKeyCredential extends DisplayException
{
    public function __construct()
    {
        parent::__construct('The given passkey is not a valid public key credential. Please check the format and try again.');
    }
}
