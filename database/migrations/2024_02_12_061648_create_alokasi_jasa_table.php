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
        Schema::create('alokasi_jasa', function (Blueprint $table) {
            $table->id();
            $table->integer('tanggal_tutup_buku')->autoIncrement(false);
            $table->integer('bulan')->autoIncrement(false);
            $table->string('uraian');
            $table->integer('jasa_anggota')->autoIncrement(false);
            $table->integer('operasional')->autoIncrement(false);
            $table->integer('jasa_bersih')->autoIncrement(false);
            $table->integer('shu_simpanan')->autoIncrement(false);
            $table->integer('total_shu')->autoIncrement(false);
            $table->integer('dana_sosial')->autoIncrement(false);
            $table->integer('dana_cadangan')->autoIncrement(false);
            $table->integer('dana_pengurus')->autoIncrement(false);
            $table->integer('tahun')->autoIncrement(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alokasi_jasa');
    }
};
