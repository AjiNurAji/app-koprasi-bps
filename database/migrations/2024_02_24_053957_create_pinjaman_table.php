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
        Schema::create('pinjaman', function (Blueprint $table) {
            $table->uuid('id_pinjaman')->primary();
            $table->char('id_member');
            $table->foreign('id_member')->references('id_member')->on('members')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('tahun', false);
            $table->string('bulan', 12);
            $table->string('hari', 7);
            $table->date('tanggal_pinjam');
            $table->string('jangka_waktu', 20);
            $table->string('untuk_keperluan', 255);
            $table->string('bank_tujuan');
            $table->integer('no_rek', false);
            $table->integer('nominal', false);
            $table->integer('sisa', false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjaman');
    }
};
