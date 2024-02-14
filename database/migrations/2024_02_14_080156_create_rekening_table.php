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
            $table->id();
            $table->unsignedBigInteger('id_kas');
            $table->foreign('id_kas')->references('id')->on('kas')->onDelete('cascade')->onUpdate('cascade');
            $table->string('bulan', 12);
            $table->integer('tahun', false);
            $table->integer('masuk', false);
            $table->integer('keluar', false);
            $table->integer('saldo', false)->nullable();
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
