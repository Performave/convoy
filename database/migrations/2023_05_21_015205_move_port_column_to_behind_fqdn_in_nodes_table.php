<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('nodes', function (Blueprint $table) {
            // Explicitly include all desired attributes for Laravel 11
            $table->integer('port')->nullable(false)->after('fqdn')->change();
        });
    }

    public function down(): void
    {
        Schema::table('nodes', function (Blueprint $table) {
            // Move the column back with all necessary attributes specified
            $table->integer('port')->nullable(false)->after('secret')->change();
        });
    }
};
