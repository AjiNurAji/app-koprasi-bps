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
        Schema::table('simpanan_sukarela', function (Blueprint $table) {
            $table->integer('tahun', false);
            $table->string('bulan', 12);
            $table->string('hari', 7);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('simpanan_sukarela', function (Blueprint $table) {
            $table->dropColumn(['tahun', 'bulan', 'hari']);
        });
    }
};
