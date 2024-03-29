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
            $table->char('id_member');
            $table->foreign('id_member')->references('id_member')->on('members')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name', 40);
            $table->integer('nominal', false)->nullable();
            $table->date("tanggal_transaksi");
            $table->integer('tahun', false);
            $table->string('bulan', 12);
            $table->string('hari', 7);
            $table->integer('nominal_keluar', false)->nullable();
            $table->enum('nama_transaksi', ['simpanan_pokok', 'simpanan_sukarela', 'simpanan_wajib', 'ambil_simpanan_wajib', 'ambil_simpanan_sukarela', 'pinjaman', 'bayar_pinjaman']);
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
