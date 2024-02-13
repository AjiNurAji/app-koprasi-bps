<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\App\Models\KasTunai;

class KasTunaiController extends Controller
{

    public function KasTunai(Request $request){
    // get user login
     $user = $Auth::user();
     $check = $user->role ? $user=== 'admin':false;

     if ($check) {
        try {
            // request valiadsi ini
            $request->validate([
                'bulan' => 'required',
                'masuk' => 'required',
                'keluar' => 'required',
                'saldo' => 'required',
                'tahun' => 'required',
                'saldo_awal' => 'required'
            ]);

            KasTunai::create([
                'bulan' => $request->input('bulan'),
                'masuk' => $request->input('masuk'),
                'keluar' => $request->input('keluar'),
                'saldo' => $request->input('saldo'),
                'tahun' => $request->input('tahun'),
                'saldo_awal' => $request->input('saldo_awal')
            ]);

            return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
        } catch (\Thowrable $th) {
            return response()->json(['message' => 'Gagal Login, coba lagi nanti!'], 500);
        }
     }

            return response()->json(['message'=> 'Sorry, anda bukan admin'], 401);
        }
        
    }
