<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShuController extends Controller
{
    //

    public function Shu(Request $request)
    {
        // get user login
        $user = Auth::user();
        $check = user->role ? user->role=== 'admin':false;

        if ($check) {
            try {
                 // validasi request
                 $request->validate([
                    'nama' => 'required',
                    'simpanan' => 'required',
                    'pinjaman' => 'required',
                    'jumlah' => 'required',
                    'anggota_keluar' => 'required',
                    'total' => 'required',
                    'dibagi_RAT' => 'required',
                    'disimpan_awal' => 'required'
                 ]);

                 Shu::create([
                    'nama' => $request->input('nama'),
                    'simpanan' => $request->input('simpanan'),
                    'pinjaman' => $request->input('pinjaman'),
                    'jumlah' => $request->input('jumlah'),
                    'anggota_keluar' => $request->input('anggota_keluar'),
                    'total' => $request->input('total'),
                    'dibagi_RAT' => $request->input('dibagi_RAT'),
                    'disimpan_awal' => $request->input('disimpan_awal')
                 ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Thowrable $th) {
                return response()->json(['message' => 'Gagal Login, coba lagi nanti!'], 500);
            }
        }

               return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }
}
