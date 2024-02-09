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
        Schema::create('kas_tunai', function (Blueprint $table) {
            $table->id();
            $table->string('bulan');
            $table->integer('masuk')->autoIncrement(false);
            $table->integer('keluar')->autoIncrement(false);
            $table->integer('saldo')->autoIncrement(false);
            $table->integer('tahun')->autoIncrement(false);
            $table->integer('saldo_awal')->autoIncrement(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kas_tunai');
    }
};
