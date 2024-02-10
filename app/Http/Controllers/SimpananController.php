<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\SimpananPokok;
use App\Models\SimpananWajib;

class SimpananController extends Controller
{

    public function getDataSimpananPokok(Request $request)
    {
        $user = Auth::user();
        $check = $user->role ? $user->role === 'admin' :false;
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
        $check = $user->role ? $user->role=== 'admin' :false;


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

                
                SimpananPokok::where('id_member', $request->input('id_member'))->where('tahun', $request->input('tahun'))->update([
                    'awal_tahun' => $request->input('awal_tahun'),
                    'anggota_masuk' => $request->input('anggota_masuk'),
                    'anggota_keluar' => $request->input('anggota_keluar'),
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
        $check = $user->role ? $user->role === 'admin' :false;
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
                    'simpanan_wajib' => 'integer|nullable'
                ]);

                
                SimpananWajib::where('id_member', $request->input('id_member'))->where('tahun', $request->input('tahun'))->update([
                    'kekayaan_awal_tahun' => $request->input('kekayaan_awal_tahun'),
                    'simpanan_wajib' => $request->input('simpanan_wajib'),
                    'anggota_keluar' => $request->input('anggota_keluar'),
                ]);
                
                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }
}
