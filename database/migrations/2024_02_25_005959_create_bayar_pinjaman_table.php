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
        Schema::create('bayar_pinjaman', function (Blueprint $table) {
            $table->uuid('id_bayar_pinjaman');
            $table->char('id_pinjaman');
            $table->foreign('id_pinjaman')->references('id_pinjaman')->on('pinjaman')->onDelete('cascade')->onUpdate('cascade');
            $table->char('id_member');
            $table->foreign('id_member')->references('id_member')->on('members')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name', 40);
            $table->integer('nominal', false);
            $table->enum('jenis', ['cicilan', 'langsung']);
            $table->integer('tahun', false);
            $table->string('bulan', 12);
            $table->string('hari', 7);
            $table->date('tanggal_bayar');
            $table->string('method', 15);
            $table->string('note', 255);
            $table->integer('sisa', false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_pinjaman');
    }
};
