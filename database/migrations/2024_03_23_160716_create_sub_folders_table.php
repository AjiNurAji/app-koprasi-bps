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
        Schema::create('sub_folders', function (Blueprint $table) {
            $table->uuid('id_folder')->primary();
            $table->char('parent_folder');
            $table->foreign('parent_folder')->references('id_folder')->on('folders')->onDelete('cascade')->onUpdate('cascade');
            $table->string('path', 255);
            $table->string('name', 255);
            $table->string('author', 30);
            $table->string('type', 25)->default('File folder');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_folders');
    }
};
