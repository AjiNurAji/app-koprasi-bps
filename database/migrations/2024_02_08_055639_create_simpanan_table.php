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
            $table->char('id_member')->nullable();
            $table->foreign('id_member')->references('id_member')->on('members')->onUpdate('cascade')->onDelete('cascade')->nullable();
            $table->integer('nominal', 25)->autoIncrement(false);
            $table->integer('tahun', 4)->autoIncrement(false);
            $table->enum('type',['anggota_masuk', 'anggota_keluar', 'awal_tahun']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simpanan');
    }
};
