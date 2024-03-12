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
        Schema::create('simpanan_pokok', function (Blueprint $table) {
            $table->uuid('id_simpanan_pokok')->primary();
            $table->char('id_member');
            $table->foreign('id_member')->references('id_member')->on('members')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('tahun', false);
            $table->string('name', 40);
            $table->string('bulan', 12);
            $table->date('tanggal_transaksi');
            $table->string('hari', 7);
            $table->integer('awal_tahun', false)->nullable();
            $table->integer('anggota_masuk', false)->nullable();
            $table->integer('anggota_keluar', false)->nullable();
            $table->timestamps();
        });
    }

    /**p
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simpanan_pokok');
    }
};
