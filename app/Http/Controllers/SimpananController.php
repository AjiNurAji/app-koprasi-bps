<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\SimpananPokok;

class SimpananController extends Controller
{
    public function simpananPokok(Request $request){
        // get user login
        $user = Auth::user();
        $check = $user->role ? $user->role=== 'admin' :false;


        if ($check) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required',
                    'tahun' => 'requred',
                    'type' => 'required',
                    'nominal' => 'required'
                ]);

                SimpananPokok::create([
                    'id_member' => $request->input('id_member'),
                    'tahun' => $request->input('tahun'),
                    'type' => $request->input('type'),
                    'nominal' => $request->input('nominal')
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }
}
