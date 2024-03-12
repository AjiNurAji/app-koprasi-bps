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
            $table->uuid('id_simpanan_sukarela')->primary();
            $table->char('id_member')->nullable();
            $table->foreign('id_member')->references('id_member')->on('members')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('sukarela', false)->nullable();
            $table->integer('shu', false)->nullable();
            $table->integer('awal_tahun', false)->nullable();
            $table->integer('selama_tahun', false)->nullable();
            $table->integer('diambil', false)->nullable();
            $table->integer('disimpan_kembali', false)->nullable();
            $table->integer('akhir_tahun', false)->nullable();
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
