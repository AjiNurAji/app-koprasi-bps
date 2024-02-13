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
        Schema::create('transaksi', function (Blueprint $table) {
            $table->uuid('id_transaksi')->primary();
            $table->char('id_member')->nullable();
            $table->foreign('id_member')->references('id_member')->on('members')->onDelete('SET NULL')->onUpdate('SET NULL')->nullable();
            $table->integer('nominal', false);
            $table->integer('tahun', false);
            $table->string('bulan', 12);
            $table->string('hari', 7);
            $table->enum('nama_transaksi', ['simpanan_pokok', 'simpanan_sukarela', 'simpanan_wajib', 'pinjaman_harian', 'pinjaman_bulanan']);
            $table->enum('type', ['simpanan', 'pinjaman']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
