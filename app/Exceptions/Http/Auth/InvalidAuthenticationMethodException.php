<?php

namespace App\Exceptions\Http\Auth;

use App\Exceptions\DisplayException;

class InvalidAuthenticationMethodException extends DisplayException
{
    public function __construct()
    {
        parent::__construct('No valid authentication method provided.');
    }
}
