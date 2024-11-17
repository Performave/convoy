<?php

namespace App\Http\Requests\Auth\Passkeys;

use App\Models\Passkey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class RenamePasskeyRequest extends FormRequest
{
    public function rules(): array
    {
        return Arr::only(Passkey::$validationRules, ['name']);
    }
}
