<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\App\Models\JasaBank;

class JasaBankController extends Controller
{
    public function JasaBank(Request $request){
       //get user login
        $user = Auth::user();
        $check = $user->role ? $user->role=== 'admin' :false;

        if ($check) {
            try {
                // request valiadsi ini
                $request->validate([
                    'bulan' => 'required', 
                    'debet' => 'required',
                    'kredit' => 'required',
                    'saldo' => 'required',
                    'bunga_bank' => 'required',
                    'pajak' => 'required',
                    'ADM' => 'required',
                    'nominal' => 'required'              
                ]);

                JasaBank::create([
                    'bulan' => $request->input('bulan'),
                    'debet' => $request->input('debet'),
                    'kredit' => $request->input('kredit'),
                    'saldo' => $request->input('saldo'),
                    'bunga_bank' => $request->input('bunga_bank'),
                    'pajak' => $request->input('pajak'),
                    'ADM' => $request->input('ADM'),
                    'nominal' => $request->input('nominal')
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch(\Thowrable $th) {
                return response()->json(['message' => 'Gagal Login, coba lagi nanti!'], 500);
            }
        }

                return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
            } 
}
