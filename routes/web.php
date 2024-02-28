<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\PiutangController;
use App\Http\Controllers\SimpananController;
use App\Http\Controllers\UserController;
use App\Models\SimpananSukarela;
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

    // update
    Route::get('/profile', [UserController::class, 'index'])->name('profile');
    Route::post('/profile/update', [UserController::class, 'updateProfile'])->name('update_profile');
    
    // kas
    Route::post('/kas/saldo_awal', [KasController::class, 'setSaldoAwal'])->name('set_saldo_awal');
    Route::get('/kas/tunai', [HomepageController::class, 'kasTunai'])->name('kas_tunai');
    Route::post('/kas/tunai', [KasController::class, 'kasTunai'])->name('kas_tunai');

    Route::get('/kas/rekening', [HomepageController::class, 'kasRekening'])->name('kas_rekening');
    Route::post('/kas/rekening', [KasController::class, 'kasRekening'])->name('kas_rekening');

    // ad-art
    Route::get('/ad-art', [HomepageController::class, 'adART'])->name('ad-art');

    // jasa piutang
    Route::get('/jasa-anggota', [HomepageController::class, 'jasaPiutang'])->name('jasa_piutang');
});

Route::middleware(['auth:admin'])->group(function () {
    // admin
    Route::get('/admin', [HomepageController::class, 'admin'])->name('admin');

    // member
    Route::get('/members', [MemberController::class, 'index'])->name('members');
    Route::post('/members/create', [MemberController::class, 'store'])->name('create_member');
    
    // history
    Route::get('/history', [HomepageController::class, 'history'])->name('history');

    // simpanan
    // pokok
    Route::get('/simpanan/pokok', [HomepageController::class, 'simpananPokok'])->name('simpanan_pokok');
    Route::post('/simpanan/pokok', [SimpananController::class, 'getDataSimpananPokok'])->name('simpanan_pokok');
    Route::post('/simpanan/pokok/ceate', [SimpananController::class, 'simpananPokok'])->name('simpanan_pokok_create');

    // wajib
    Route::get('/simpanan/wajib', [HomepageController::class, 'simpananWajib'])->name('simpanan_wajib');
    Route::post('/simpanan/wajib', [SimpananController::class, 'getDataSimpananWajib'])->name('simpanan_wajib');
    Route::post('/simpanan/wajib/create', [SimpananController::class, 'simpananWajib'])->name('simpanan_wajib_create');
    
    // sukarela
    Route::get('/simpanan/sukarela', [HomepageController::class, 'simpananSukarela'])->name('simpanan_sukarela');
    Route::post('/simpanan/sukarela', [SimpananController::class, 'getDataSimpananSukarela'])->name('simpanan_sukarela');
    Route::post('/simpanan/sukarela/create', [SimpananController::class, 'simpananSukarela'])->name('simpanan_sukarela_create');

    //upload file
    Route::get('index', 'UploadController@index');

    // piutang 
    Route::post('/jasa-anggota/set', [PiutangController::class, 'setJasaAnggota'])->name('jasa_anggota_set');
    Route::get('/pinjaman-anggota', [HomepageController::class, 'pinjamanAnggota'])->name('pinjaman_anggota');
    Route::post('/pinjaman-anggota', [PiutangController::class, 'getPinjamanAnggota'])->name('pinjaman_anggota');
    Route::post('/pinjaman-anggota/create', [PiutangController::class, 'pinjamanAnggota'])->name('pinjaman_anggota_create');
    Route::post('/pinjaman-anggota/get-pay', [PiutangController::class, 'getBayarPinjamanAnggota'])->name('bayar_pinjaman_anggota');
    Route::post('/pinjaman-anggota/pay', [PiutangController::class, 'bayarPinjamanAnggota'])->name('bayar_pinjaman');
});

require __DIR__ . '/auth.php';
require __DIR__.'/file.php';