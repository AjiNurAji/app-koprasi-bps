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
        Schema::create('simpanan_wajib', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('bulan');
            $table->integer('tahun')->autoIncrement(false);
            $table->integer('kekayaan_awal')->autoIncrement(false);
            $table->integer('simpanan_wajib')->autoIncrement(false);
            $table->integer('anggota_keluar')->autoIncrement(false);
            $table->integer('kekayaan_akhir')->autoIncrement(false);
            $table->integer('nominal')->autoIncrement(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simpanan_wajib');
    }
};
