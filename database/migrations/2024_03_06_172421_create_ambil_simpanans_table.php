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
        Schema::create('ambil_simpanan', function (Blueprint $table) {
            $table->uuid('_id')->primary();
            $table->char('id_member');
            $table->foreign('id_member')->references('id_member')->on('members')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name', 40);
            $table->date('tanggal_ambil');
            $table->integer('nominal', false);
            $table->string('note', 255);
            $table->enum('simpanan', ['wajib', 'sukarela']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ambil_simpanan');
    }
};
