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
        Schema::create('piutang_anggota', function (Blueprint $table) {
            $table->id();
            $table->string('nama_anggota');
            $table->integer('piutang_lama')->autoIncrement(false);
            $table->integer('piutang_baru')->autoIncrement(false);
            $table->integer('cicilan')->autoIncrement(false);
            $table->integer('bayar_langsung')->autoIncrement(false);
            $table->integer('total_bayar')->autoIncrement(false);
            $table->integer('sisa_piutang')->autoIncrement(false);
            $table->integer('tahun')->autoIncrement(false);
            $table->integer('bulan')->autoIncrement(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('piutang_anggota');
    }
};
