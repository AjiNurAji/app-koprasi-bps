<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\SimpananController;
use App\Models\SimpananWajib;
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

    // delete anggota
    Route::delete('/members/{id}', 'MemberController@delete');
  
    Route::post('/simpanan/wajib', [SimpananController::class, 'getDataSimpananWajib'])->name('simpanan_wajib');
    Route::post('/simpanan/wajib/create', [SimpananController::class, 'simpananWajib'])->name('simpanan_wajib_create');

    // history
    Route::get('/history', [HomepageController::class, 'history'])->name('history');

    Route::post('/simpanan/pokok/table', [PDFController::class, 'ExportSimpananPokokPDF'])->name('simpanan_pokok_pdf');
    Route::post('/simpanan/wajib/table', [PDFController::class, 'ExportSimpananWajibPDF'])->name('simpanan_wajib_pdf');
    // Route::get('/simpanan/wajib/table', function () {
    //     $simpananWajib = SimpananWajib::where('tahun', date('Y'))->get();

    //     foreach ($simpananWajib as $data) {
    //         $datas[] = [
    //             'name' => $data->member->name,
    //             'kekayaan_awal_tahun' => $data->kekayaan_awal_tahun === null ? null : $data->kekayaan_awal_tahun,
    //             'simpanan_wajib' => $data->simpanan_wajib === null ? null : $data->simpanan_wajib,
    //             'anggota_keluar' => $data->anggota_keluar === null ? null : $data->anggota_keluar,
    //             'kekayaan' => ($data->kekayaan_awal_tahun === null ? null : $data->kekayaan_awal_tahun) + ($data->simpanan_wajib === null ? null : $data->simpanan_wajib) - ($data->anggota_keluar === null ? null : $data->anggota_keluar),
    //         ];
    //     }

    //     $kekayaanAwalTahun = SimpananWajib::where('tahun', date('Y'))->sum('kekayaan_awal_tahun');
    //     $simpananWajibSum = SimpananWajib::where('tahun', date('Y'))->sum('simpanan_wajib');
    //     $anggotaKeluar = SimpananWajib::where('tahun', date('Y'))->sum('anggota_keluar');
    //     $totalWajib = $kekayaanAwalTahun + $simpananWajibSum - $anggotaKeluar;

    //     return view('Exports.Simpanan.simpananWajib', [
    //         'data' => isset($datas) ? $datas : $simpananWajib, 'total' => [
    //             'kekayaan_awal_tahun' => $kekayaanAwalTahun,
    //             'simpanan_wajib' => $simpananWajibSum,
    //             'anggota_keluar' => $anggotaKeluar,
    //             'jumlah' => $totalWajib,
    //         ]
    //     ]);
    // })->name('simpanan_pokok_pdf');

    //upload file
    Route::get('index', 'UploadController@index');
});

require __DIR__ . '/auth.php';
