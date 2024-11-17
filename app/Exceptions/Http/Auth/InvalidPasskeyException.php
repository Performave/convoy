<?php

namespace App\Exceptions\Http\Auth;

use App\Exceptions\DisplayException;

class InvalidPasskeyException extends DisplayException
{
    public function __construct()
    {
        parent::__construct('The provided passkey is invalid. Please try again or use an alternative login method.');
    }
}
