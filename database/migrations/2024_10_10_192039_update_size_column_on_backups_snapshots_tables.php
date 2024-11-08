<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('backups', function (Blueprint $table) {
            $table->unsignedInteger('size')->nullable(false)->change();
        });

        Schema::table('snapshots', function (Blueprint $table) {
            $table->unsignedInteger('size')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('backups', function (Blueprint $table) {
            $table->unsignedBigInteger('size')->default(0)->nullable(false)->change();
        });

        Schema::table('snapshots', function (Blueprint $table) {
            $table->unsignedBigInteger('size')->default(0)->nullable(false)->change();
        });
    }
};
