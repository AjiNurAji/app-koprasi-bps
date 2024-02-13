<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\App\Models\SimpananWajib;

class SimpananWajibController extends Controller
{
    public function SimpananWajib(Request $request){
        // get user login
        $user = Auth::user();
        $check = $user->role ? $user->role=== 'admin' :false;

        if ($check) {
            try {
                //validasi request
                $request->validate([
                    'nama' => 'required',
                    'bulan' => 'required',
                    'tahun' => 'required',
                    'kekayaan_alam' => 'required',
                    'simpanan_wajib' => 'required',
                    'anggota_keluar' => 'required',
                    'kekayaan_akhir' => 'required',
                    'nominal' => 'required'
                ]);

                SimpananWajib::create([
                    'nama' => $request->input('nama'),
                    'bulan' => $request->input('bulan'),
                    'tahun' => $request->input('tahun'),
                    'kekayaan_alam' => $request->input('kekayaan_alam'),
                    'simpanan_wajib' => $request->input('simpanan_wajib'),
                    'anggota_keluar' => $request->input('anggota_keluar'),
                    'kekayaan_akhir' => $request->input('kekayaan_akhir'),
                    'nominal' => $request->input('nominal')
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Thowrable $th) {
                return response()->json(['message' => 'Gagal Login, coba lagi nanti!'], 500);
            }
        }

            return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
      }
}
