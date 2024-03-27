<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\PiutangController;
use App\Http\Controllers\SimpananController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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

Route::get("/", function () {
    return redirect()->route("login");
})->name("default");

Route::get("/forgot_password", [PasswordController::class, "index"])->name("forgot_password");
Route::post("/forgot_password/getuser", [PasswordController::class, "getUser"])->name("get_user");
Route::post("/forgot_password/{id}", [PasswordController::class, "updatePassword"])->name("update_password");

Route::middleware(["auth:admin,member"])->group(function () {
    Route::get("/dashboard", [HomepageController::class, "index"])->name("dashboard");

    Route::post("logout", [AuthController::class, "logout"])->name("logout");
    Route::get("/team", function () {
        return Inertia::render("Team/Team");
    })->name("team");

    // update
    Route::get("/profile", [UserController::class, "index"])->name("profile");
    Route::post("/profile/update", [UserController::class, "updateProfile"])->name("update_profile");

    // kas
    Route::get("/kas/{param}/saldo_awal", [HomepageController::class, "setSaldoAwal"])->name("set_saldo_awal_page");
    Route::post("/kas/saldo_awal", [KasController::class, "setSaldoAwal"])->name("set_saldo_awal");

    Route::get("/kas/tunai", [HomepageController::class, "kasTunai"])->name("kas_tunai");
    Route::post("/kas/tunai", [KasController::class, "kasTunai"])->name("kas_tunai");
    Route::get("/kas/tunai/create", [HomepageController::class, "createKasTunai"])->name("kas_tunai_transaksi");

    Route::get("/kas/rekening", [HomepageController::class, "kasRekening"])->name("kas_rekening");
    Route::post("/kas/rekening", [KasController::class, "kasRekening"])->name("kas_rekening");
    Route::get("/kas/rekening/create", [HomepageController::class, "createKasRekening"])->name("kas_rekening_transaksi");

    // ad-art
    Route::get("/ad-art", [HomepageController::class, "adART"])->name("ad-art");
    Route::get("/pdfjs/web/storage/ad_art/{filename}", function (string $filename) {
        return Storage::disk("public")->get("ad_art/" . $filename);
    });

    Route::get("/laporan-rat", [HomepageController::class, "laporanRat"])->name("laporan_rat");

    // transaksi
    Route::get("/pinjaman-anggota/transaction", [HomepageController::class, "pinjamanTransaction"])->name("pinjaman_transaksi");

    // jasa piutang
    Route::get("/jasa-anggota", [HomepageController::class, "jasaPiutang"])->name("jasa_piutang");
});

Route::middleware(["auth:admin"])->group(function () {
    // admin
    Route::get("/admin", [HomepageController::class, "admin"])->name("admin");
    Route::get("/admin/create", [HomepageController::class, "adminCreate"])->name("create_admin");
    Route::post("/admin/create", [UserController::class, "createUser"])->name("create_admin");

    // member
    Route::get("/members", [MemberController::class, "index"])->name("members");
    Route::get("/members/create", [MemberController::class, "create"])->name("create_member_page");
    Route::post("/members/create", [MemberController::class, "store"])->name("create_member");

    // delete anggota
    Route::delete("/members/{id}", [MemberController::class, "softDeletes"])->name("delete_member");
    Route::delete("/members/deleted/{id}", [MemberController::class, "permanentDeletes"])->name("delete_permanen_member");

    //edit anggota
    Route::get("/members/{id}", [MemberController::class, "editData"])->name("edit_member");
    Route::post("/members", [MemberController::class, "updatedata"])->name("update_member");

    // history
    Route::get("/history", [HomepageController::class, "history"])->name("history");

    // simpanan
    // pokok
    Route::get("/simpanan/pokok", [HomepageController::class, "simpananPokok"])->name("simpanan_pokok");
    Route::post("/simpanan/pokok", [SimpananController::class, "getDataSimpananPokok"])->name("simpanan_pokok");
    Route::get("/simpanan/pokok/transaction", [HomepageController::class, "pokokTransaksi"])->name("transaksi_pokok");
    Route::post("/simpanan/pokok/create", [SimpananController::class, "simpananPokok"])->name("simpanan_pokok_create");

    // wajib
    Route::get("/simpanan/wajib", [HomepageController::class, "simpananWajib"])->name("simpanan_wajib");
    Route::post("/simpanan/wajib", [SimpananController::class, "getDataSimpananWajib"])->name("simpanan_wajib");
    Route::post("/simpanan/wajib/ambil", [SimpananController::class, "ambilSimpananWajib"])->name("ambil_simpanan_wajib");
    Route::get("/simpanan/wajib/transaction", [HomepageController::class, "wajibTransaksi"])->name("transaksi_wajib");
    Route::post("/simpanan/wajib/create", [SimpananController::class, "simpananWajib"])->name("simpanan_wajib_create");

    // sukarela
    Route::get("/simpanan/sukarela", [HomepageController::class, "simpananSukarela"])->name("simpanan_sukarela");
    Route::post("/simpanan/sukarela", [SimpananController::class, "getDataSimpananSukarela"])->name("simpanan_sukarela");
    Route::post("/simpanan/sukarela/ambil", [SimpananController::class, "ambilSimpananSukarela"])->name("ambil_simpanan_sukarela");
    Route::get("/simpanan/sukarela/transaction", [HomepageController::class, "sukarelaTransaksi"])->name("sukarela_transaction");
    Route::post("/simpanan/sukarela/create", [SimpananController::class, "simpananSukarela"])->name("simpanan_sukarela_create");


    // edit dan update password
    Route::get("/member/change-password", "MemberController@change-password")->name("change-password");
    Route::post("/member/update-password", "MemberController@update-password")->name("update_password");

    // piutang 
    // set jasa anggota
    Route::post("/jasa-anggota/set", [PiutangController::class, "setJasaAnggota"])->name("jasa_anggota_set");
    Route::get("/jasa-anggota/create", [HomepageController::class, "jasaPiutangCreate"])->name("jasa_piutang_create");

    // halaman pinjaman
    Route::get("/pinjaman-anggota", [HomepageController::class, "pinjamanAnggota"])->name("pinjaman_anggota");
    Route::get("/pinjaman", [HomepageController::class, "pinjaman"])->name("pinjaman_anggota__");

    // buat pinjaman
    Route::post("/pinjaman-anggota", [PiutangController::class, "getPinjamanAnggota"])->name("pinjaman_anggota");
    Route::post("/pinjaman-anggota/create", [PiutangController::class, "pinjamanAnggota"])->name("pinjaman_anggota_create");

    // bayar pinjaman
    Route::post("/pinjaman-anggota/get-pay", [PiutangController::class, "getBayarPinjamanAnggota"])->name("bayar_pinjaman_anggota");
    Route::post("/pinjaman-anggota/pay", [PiutangController::class, "bayarPinjamanAnggota"])->name("bayar_pinjaman");

    // view pinjaman
    Route::get("/pinjaman-anggota/{id}", [HomepageController::class, "viewPinjaman"])->name("view_pinjaman_anggota");

    // post ad-art
    Route::post("/ad-art/set", [UploadController::class, "adART"])->name("ad_art_set");

    // upload file
    Route::post("/laporan-rat/uploadFile", [UploadController::class, "uploadFile"])->name("upload_file");
    Route::delete("/laporan-rat/deleteFile/{id}", [UploadController::class, "deleteFile"])->name("file_delete");
    Route::post("/laporan-rat/rename/{id}", [UploadController::class, "renameFile"])->name("rename_file");
});

require __DIR__ . "/auth.php";
require __DIR__ . "/file.php";
