<?php

namespace App\Http\Controllers;

use App\Exports\SimpananPokokExport;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\SimpananPokok;
use App\Models\SimpananWajib;
use Carbon\Carbon;

class SimpananController extends Controller
{

    public function getDataSimpananPokok(Request $request)
    {
        $user = Auth::user();
        $check = $user->role ? $user->role === 'admin' : false;
        if ($check) {
            $simpananPokok = SimpananPokok::where('id_member', $request->input('id_member'))->where('tahun', $request->input('tahun'))->first();
            if ($simpananPokok) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'simpanan' => $simpananPokok], 200);
            }

            $createData = SimpananPokok::create([
                'id_simpanan_pokok' => Str::uuid(),
                'id_member' => $request->input('id_member'),
                'tahun' => $request->input('tahun'),
                'hari' => $request->input('hari'),
                'bulan' => $request->input('bulan'),
            ]);

            return response()->json(['message' => 'Data berhasil didapatkan', 'simpanan' => $createData], 200);
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }

    public function simpananPokok(Request $request)
    {
        // get user login
        $user = Auth::user();
        $check = $user->role ? $user->role === 'admin' : false;


        if ($check) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'awal_tahun' => 'integer|nullable',
                    'anggota_keluar' => 'integer|nullable',
                    'anggota_masuk' => 'integer|nullable'
                ]);

                // cari transaksi, update jika ada dan buatkan jika tidak ada
                // $transaksi = Transaksi::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                //     ->where('id_member', $request->input('id_member'))
                //     ->where('tahun', $request->input('tahun'))
                //     ->where('hari', $request->input('hari'))
                //     ->where('bulan', $request->input('bulan'))
                //     ->where('nama_transaksi', 'simpanan_pokok')
                //     ->first();

                // cek transaksi apa aja yang sudah dilakukan
                $simpananPokok = SimpananPokok::where('id_member', $request->input('id_member'))
                    ->where('bulan', $request->input('bulan'))
                    ->first();

                    // dd(!$simpananPokok->awal_tahun);

                if (!$simpananPokok->awal_tahun && !$simpananPokok->anggota_masuk && !$simpananPokok->anggota_keluar) {
                    $nominal = $request->input('anggota_masuk') + $request->input('awal_tahun');
                    $keluar = $request->input('anggota_keluar');
                } else if ($simpananPokok->awal_tahun && !$simpananPokok->anggota_masuk && !$simpananPokok->anggota_keluar) {
                    $nominal = $request->input('awal_tahun') + $simpananPokok->awal_tahun + $request->input('anggota_masuk');
                    $keluar = $request->input('anggota_keluar');
                } else if (!$simpananPokok->awal_tahun && $simpananPokok->anggota_masuk && !$simpananPokok->anggota_keluar) {
                    $keluar = $request->input('anggota_keluar') ;
                    $nominal = $request->input('awal_tahun') + $request->input('anggota_masuk') + $simpananPokok->anggota_masuk;
                } else if ($simpananPokok->awal_tahun && $simpananPokok->anggota_masuk && !$simpananPokok->anggota_keluar) {
                    $keluar = $request->input('anggota_keluar');
                    $nominal = $request->input('awal_tahun') + $simpananPokok->awal_tahun + $request->input('anggota_masuk') + $simpananPokok->anggota_masuk;
                } else if ($simpananPokok->awal_tahun && $simpananPokok->anggota_masuk && $simpananPokok->anggota_keluar) {
                    $nominal = $simpananPokok->anggota_masuk + $request->input('anggota_masuk') + $simpananPokok->awal_tahun + $request->input('awal_tahun');
                    $keluar = $simpananPokok->anggota_keluar + $request->input('anggota_keluar');
                }


                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $nominal,
                    'type' => 'simpanan',
                    'nominal_keluar' => $keluar,
                    'nama_transaksi' => 'simpanan_pokok',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                $simpananPokok->update([
                    'awal_tahun' => $simpananPokok->awal_tahun ? $simpananPokok->awal_tahun + $request->input('awal_tahun') : $request->input('awal_tahun'),
                    'hari' => $request->input('hari'),
                    'anggota_masuk' => $simpananPokok->anggota_masuk ? $simpananPokok->anggota_masuk + $request->input('anggota_masuk') : $request->input('anggota_masuk'),
                    'anggota_keluar' => $simpananPokok->anggota_keluar ? $simpananPokok->anggota_keluar + $request->input('anggota_keluar') : $request->input('anggota_keluar'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }

    public function getDataSimpananWajib(Request $request)
    {
        $user = Auth::user();
        $check = $user->role ? $user->role === 'admin' : false;
        if ($check) {
            $simpananWajib = SimpananWajib::where('id_member', $request->input('id_member'))->where('tahun', $request->input('tahun'))->first();
            if ($simpananWajib) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'simpanan' => $simpananWajib], 200);
            }

            $createData = SimpananWajib::create([
                'id_simpanan_wajib' => Str::uuid(),
                'id_member' => $request->input('id_member'),
                'tahun' => $request->input('tahun'),
                'hari' => $request->input('hari'),
                'bulan' => $request->input('bulan'),
            ]);

            return response()->json(['message' => 'Data berhasil didapatkan', 'simpanan' => $createData], 200);
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }

    public function simpananWajib(Request $request)
    {
        // get user login
        $user = Auth::user();
        $check = $user->role ? $user->role === 'admin' : false;


        if ($check) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'kekayaan_awal_tahun' => 'integer|nullable',
                    'anggota_keluar' => 'integer|nullable',
                    'simpanan_wajib' => 'integer|nullable',
                ]);

                // cari transaksi, update jika ada dan buatkan jika tidak ada
                $transaksi = Transaksi::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                    ->where('id_member', $request->input('id_member'))
                    ->where('tahun', $request->input('tahun'))
                    ->where('hari', $request->input('hari'))
                    ->where('bulan', $request->input('bulan'))
                    ->where('nama_transaksi', 'simpanan_wajib')
                    ->first();

                // cek transaksi apa aja yang sudah dilakukan
                $simpananWajib = SimpananWajib::where('id_member', $request->input('id_member'))
                    ->where('bulan', $request->input('bulan'))
                    ->first();

                if (!$simpananWajib->kekayaan_awal_tahun && !$simpananWajib->simpanan_wajib && !$simpananWajib->anggota_keluar) {
                    $nominal = $request->input('simpanan_wajib') + $request->input('kekayaan_awal_tahun');
                    $keluar = $request->input('anggota_keluar');
                } else if ($simpananWajib->kekayaan_awal_tahun && !$simpananWajib->simpanan_wajib && !$simpananWajib->anggota_keluar) {
                    $nominal = $request->input('kekayaan_awal_tahun') + $simpananWajib->kekayaan_awal_tahun + $request->input('simpanan_wajib');
                    $keluar = $request->input('anggota_keluar');
                } else if (!$simpananWajib->kekayaan_awal_tahun && $simpananWajib->simpanan_wajib && !$simpananWajib->anggota_keluar) {
                    $nominal = $request->input('kekayaan_awal_tahun') + $request->input('simpanan_wajib') + $simpananWajib->simpanan_wajib;
                    $keluar = $request->input('anggota_keluar');
                } else if ($simpananWajib->kekayaan_awal_tahun && $simpananWajib->simpanan_wajib && !$simpananWajib->anggota_keluar) {
                    $keluar = $request->input('anggota_keluar');
                    $nominal = $request->input('kekayaan_awal_tahun') + $simpananWajib->kekayaan_awal_tahun + $request->input('simpanan_wajib') + $simpananWajib->simpanan_wajib;
                } else if ($simpananWajib->kekayaan_awal_tahun && $simpananWajib->simpanan_wajib && $simpananWajib->anggota_keluar) {
                    $nominal = $simpananWajib->simpanan_wajib + $request->input('simpanan_wajib') + $simpananWajib->kekayaan_awal_tahun + $request->input('kekayaan_awal_tahun');
                    $keluar = $simpananWajib->anggota_keluar + $request->input('anggota_keluar');
                }

                
                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $nominal,
                    'type' => 'simpanan',
                    'nominal_keluar' => $keluar,
                    'nama_transaksi' => 'simpanan_wajib',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                $simpananWajib->update([
                    'kekayaan_awal_tahun' => $simpananWajib->kekayaan_awal_tahun ? $simpananWajib->kekayaan_awal_tahun + $request->input('kekayaan_awal_tahun') : $request->input('kekayaan_awal_tahun'),
                    'hari' => $request->input('hari'),
                    'simpanan_wajib' => $simpananWajib->simpanan_wajib ? $simpananWajib->simpanan_wajib + $request->input('simpanan_wajib') : $request->input('simpanan_wajib'),
                    'anggota_keluar' => $simpananWajib->anggota_keluar ? $simpananWajib->anggota_keluar + $request->input('anggota_keluar') : $request->input('anggota_keluar'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }
}
