<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmIdentityRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'passkey' => ['nullable', 'json', 'bail', function ($attribute, $value, $fail) {
                if ($this->has('password')) {
                    $fail('Only one of passkey or password can be provided.');
                }
            }],
            'password' => ['nullable', 'string', 'bail', function ($attribute, $value, $fail) {
                if ($this->has('passkey')) {
                    $fail('Only one of passkey or password can be provided.');
                }
            }],
        ];
    }
}
