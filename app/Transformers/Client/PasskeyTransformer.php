<?php

namespace App\Transformers\Client;

use App\Models\Passkey;
use League\Fractal\TransformerAbstract;

class PasskeyTransformer extends TransformerAbstract
{
    public function transform(Passkey $passkey): array
    {
        return [
            'id' => $passkey->id,
            'name' => $passkey->name,
            'last_used_at' => $passkey->last_used_at,
            'created_at' => $passkey->created_at,
        ];
    }
}
