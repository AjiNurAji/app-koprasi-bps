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
        Schema::create('rekening', function (Blueprint $table) {
            $table->uuid('id_rekening')->primary();
            $table->char('id_kas');
            $table->foreign('id_kas')->references('id')->on('kas')->onDelete('cascade')->onUpdate('cascade');
            $table->string('bulan', 12);
            $table->date("tanggal_transaksi");
            $table->integer('tahun', false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekening');
    }
};