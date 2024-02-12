<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\App\Models\AlookasiJasa;


class AlokasiJasaController extends Controller
{
    public function AlookasiJasa(Request $request) 
    {
        //
        $user = Auth::user();
        $check = $user->role ? user->role=== 'admin':false;

        if ($check) {
            try {
                $request->validate([
                   'tanggal_tutup_buku' => 'required',
                    'bulan' => 'required',
                    'uraian' => 'required',
                    'jasa_anggota' => 'required',
                    'operasional' => 'required',
                    'jasa_bersih' => 'required',
                    'shu_simpanan' => 'required',
                    'shu_pinjaman' => 'required',
                    'total_shu' => 'required',
                    'dana_sosial' => 'required',
                    'dana_cadangan' => 'required',
                    'dana_pengurus' => 'required'
                ]);

                AlookasiJasa::create([
                    'tanggal_tutup_buku' => $request->input('tanggal_tutup_buku'),
                    'bulan' => $request->input('bulan'),
                    'uraian' => $request->input('uraian'),
                    'jasa_anggota' => $request->input('jasa_anggota'),
                    'operasional' => $request->input('operasional'),
                    'jasa_bersih' =>  $request->input('jasa_bersih'),
                    'shu_simpanan' => $request->input('shu_simpanan'),
                    'shu_pinjaman' => $request->input('shu_pinjaman'),
                    'total_shu' => $request->input('total_shu'),
                    'dana_sosial' => $request->input('dana_sosial'),
                    'dana_cadangan' => $request->input('dana_cadangan'),
                    'dana_pengurus' => $request->input('dana_pengurus')
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch(\Thowrable $th) {
                return response()->json(['message' => 'Gagal Login, coba lagi nanti!'], 500);
            }
        }

                return response()->json(['message' => 'Soryy, anda bukan admin'], 401);
    }
}
