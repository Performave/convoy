<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ip_addresses', function (Blueprint $table) {
            // Modify the 'type' column to be after 'server_id' with all necessary attributes
            $table->string('type', 255)->after('server_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ip_addresses', function (Blueprint $table) {
            // Move the 'type' column to be after 'mac_address' with all necessary attributes
            $table->string('type', 255)->after('mac_address')->change();
        });
    }
};
