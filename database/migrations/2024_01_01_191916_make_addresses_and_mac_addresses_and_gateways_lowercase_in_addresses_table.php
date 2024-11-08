<?php

use App\Models\Address;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Address::chunkById(100, function ($ipAddresses) {
            foreach ($ipAddresses as $ip) {
                $ip->address = strtolower($ip->address);
                $ip->gateway = strtolower($ip->gateway);
                $ip->mac_address = strtolower($ip->mac_address);
                $ip->save();
            }
        });
    }
};
