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
        Schema::create('jasa_bank', function (Blueprint $table) {
            $table->id();
            $table->string('bulan');
            $table->integer('debet')->autoIncrement(false);
            $table->integer('kredit')->autoIncrement(false);
            $table->integer('saldo')->autoIncrement(false);
            $table->integer('bunga_bank')->autoIncrement(false);
            $table->integer('pajak')->autoIncrement(false);
            $table->integer('ADM')->autoIncrement(false);
            $table->integer('nominal')->autoIncrement(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jasa_bank');
    }
};
