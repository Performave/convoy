<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Delete records based on conditions without raw SQL
        DB::table('backups')
            ->whereNotNull('completed_at')
            ->where('is_successful', 0)
            ->delete();

        Schema::table('backups', function (Blueprint $table) {
            $table->string('description')->nullable()->after('name');
            $table->string('errors')->nullable()->after('description');

            $table->dropSoftDeletes();
            $table->dropColumn(['is_successful', 'updated_at']);

            // Explicitly define 'is_locked' attributes to prevent unintended behavior
            $table->boolean('is_locked')->default(false)->nullable(false)->after('description')->change();
        });
    }

    public function down(): void
    {
        Schema::table('backups', function (Blueprint $table) {
            $table->dropColumn(['description', 'errors']);

            // Re-apply all attributes to 'is_locked' in down migration
            $table->boolean('is_locked')->nullable()->default(null)->after('is_successful')->change();

            $table->boolean('is_successful')->default(false)->after('server_id');
            $table->timestamp('updated_at')->nullable()->after('created_at');
            $table->softDeletes()->after('updated_at');
        });
    }
};
