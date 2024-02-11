<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\SimpananController;
use App\Models\SimpananPokok;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
})->name('default');

Route::middleware(['auth:admin,member'])->group(function () {
    Route::get('/dashboard', [HomepageController::class, 'index'])->name('dashboard');

    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/team', function () {
        return Inertia::render('Team/Team');
    })->name('team');
});

Route::middleware(['auth:admin'])->group(function () {
    // member
    Route::get('/members', [MemberController::class, 'index'])->name('members');
    Route::post('/members/create', [MemberController::class, 'store'])->name('create_member');

    // simpanan
    // pokok
    Route::get('/simpanan/pokok', [HomepageController::class, 'simpananPokok'])->name('simpanan_pokok');
    Route::post('/simpanan/pokok', [SimpananController::class, 'getDataSimpananPokok'])->name('simpanan_pokok');
    Route::post('/simpanan/pokok/ceate', [SimpananController::class, 'simpananPokok'])->name('simpanan_pokok_create');

    // wajib
    Route::get('/simpanan/wajib', [HomepageController::class, 'simpananWajib'])->name('simpanan_wajib');
    Route::post('/simpanan/wajib', [SimpananController::class, 'getDataSimpananWajib'])->name('simpanan_wajib');
    Route::post('/simpanan/wajib/create', [SimpananController::class, 'simpananWajib'])->name('simpanan_wajib_create');

    // history
    Route::get('/history', [HomepageController::class, 'history'])->name('history');
});

require __DIR__ . '/auth.php';
