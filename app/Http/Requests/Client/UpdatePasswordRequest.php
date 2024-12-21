<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\BaseApiRequest;

class UpdatePasswordRequest extends BaseApiRequest
{
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string', 'current_password:web'],
            'password' => ['required', 'string', 'confirmed', 'min:12'],
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.current_password' => __('The provided password does not match your current password.'),
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
