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
        Schema::create('shu', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('simpanan')->autoIncrement(false);
            $table->integer('jumlah')->autoIncrement(false);
            $table->integer('anggota_keluar')->autoIncrement(false);
            $table->integer('total')->autoIncrement(false);
            $table->integer('dibagi_RAT')->autoIncrement(false);
            $table->integer('disimpn_awal')->autoIncrement(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shu');
    }
};
