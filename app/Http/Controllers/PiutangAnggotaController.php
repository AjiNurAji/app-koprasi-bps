<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PiutangAnggotaController extends Controller
{

    public function PiutangAnggota(Request $request) 
    {
         // get user login
         $user = $Auth::user();
         $check = $user->role ? $user=== 'admin':false;

         if ($check) {
            try {
                // ini request validasi
                $request->validate([
                    'nama_anggota' => 'required',
                    'piutang_lama' => 'required',
                    'piutang_baru' => 'required',
                    'cicilan' => 'required',
                    'bayar_langsung' => 'required',
                    'total_bayar' => 'required',
                    'sisa_piutang' => 'required',
                    'tahun' => 'required',
                    'bulan' => 'required'
                ]);

                PiutangAnggota::create([
                    'nama_anggota' => $request->input('nama_anggota'),
                    'piutang_lama' => $request->input('piutang_lama'),
                    'piutang_baru' => $request->input('piutang_baru'),
                    'cicilan' => $request->input('cicilan'),
                    'bayar_langsung' => $request->input('bayar_langsung'),
                    'sisa_piutang' => $request->input('sisa_piutang'),
                    'tahun' => $request->input('tahun'),
                    'bulan' => $request->input('bulan')           
                ]);

                return response()->json(['message' => 'berhasil melakukan Transaksi'], 200);
            } catch(\Thowrable $th) {
               return response()->json(['message' => 'Gagal Login, coba lagi nanti'], 500);
            }
         }

                return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }
   
}
