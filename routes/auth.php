<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'index'])->name('login');
    Route::post('login', [AuthController::class, 'processLogin'])->name('login');
});

// Route::middleware('auth')->group(function () {
//     Route::put('password', [PasswordController::class, 'update'])->name('password.update');
// });
