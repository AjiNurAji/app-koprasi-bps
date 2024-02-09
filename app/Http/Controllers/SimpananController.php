<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\SimpananPokok;

class SimpananController extends Controller
{

    public function getDataSimpananPokok(Request $request)
    {
        $user = Auth::user();
        $check = $user->role ? $user->role === 'admin' :false;
        if ($check) {
            $simpananPokok = SimpananPokok::where('id_member', $request->input('id_member'))->where('tahun', $request->input('tahun'))->first();
            if ($simpananPokok) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'simpananPokok' => $simpananPokok], 200);
            }

            $createData = SimpananPokok::create([
                'id_simpanan_pokok' => Str::uuid(),
                'id_member' => $request->input('id_member'),
                'tahun' => $request->input('tahun'),
                'bulan' => $request->input('bulan'),
            ]);

            return response()->json(['message' => 'Data berhasil didapatkan', 'simpananPokok' => $createData], 200);
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }

    public function simpananPokok(Request $request){
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
}
