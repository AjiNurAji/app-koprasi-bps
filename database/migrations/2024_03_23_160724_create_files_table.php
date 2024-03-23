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
        Schema::create('files', function (Blueprint $table) {
            $table->uuid('id_file')->primary();
            $table->char('id_folder');
            $table->foreign('id_folder')->references('id_folder')->on('folders')->onDelete('cascade')->onUpdate('cascade');
            $table->string('filename', 100);
            $table->string('path', 255);
            $table->string('author', 30);
            $table->string('type', 25);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
