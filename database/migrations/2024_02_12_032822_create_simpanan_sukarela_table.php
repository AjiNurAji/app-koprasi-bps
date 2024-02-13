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
        Schema::create('simpanan_sukarela', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('sukarela_dari_pembulatan')->autoIncrement(false);
            $table->integer('SHU')->autoIncrement(false);
            $table->integer('awal')->autoIncrement(false);
            $table->integer('selama_tahun')->autoIncrement(false);
            $table->integer('diambil')->autoIncrement(false);
            $table->integer('disimpan_kembali')->autoIncrement(false);
            $table->integer('akhir')->autoIncrement(false);
            $table->integer('tahun')->autoIncrement(false);
            $table->integer('nominal')->autoIncrement(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simpanan_sukarela');
    }
};
