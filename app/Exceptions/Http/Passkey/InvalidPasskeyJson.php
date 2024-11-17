<?php

namespace App\Exceptions\Http\Passkey;

use App\Exceptions\DisplayException;

class InvalidPasskeyJson extends DisplayException
{
    public function __construct()
    {
        parent::__construct('The given passkey should be formatted as json. Please check the format and try again.');
    }
}
