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
        Schema::create('tr_rekening', function (Blueprint $table) {
            $table->uuid('id_tr_rekening')->primary();
            $table->char('id_rekening');
            $table->foreign('id_rekening')->references('id_rekening')->on('rekening')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('nominal', false);
            $table->enum('rekening', ['debet', 'kredit']);
            $table->enum('type', ['setor', 'bunga_bank', 'pajak', 'adm', 'penarikan']);
            $table->integer('saldo', false)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_rekening');
    }
};