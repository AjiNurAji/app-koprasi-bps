<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RekeningController extends Controller
{
    
    public function Rekening(Request $request)
    {
        // get user login
        $user = $Auth::user();
        $check = $user->role ? $user=== 'admin':false;

        if ($check) {
            try {
                // validasi request
                $request->validate([
                    'bulan' => 'required',
                    'debet' => 'required',
                    'kredit' => 'required',
                    'saldo' => 'required',
                    'saldo_awal' => 'required',
                    'setor' => 'required',
                    'bunga_bank' => 'required',
                    'pajak' => 'required',
                    'ADM' => 'required',
                    'penarikan' => 'required',
                    'nominal' => 'required',
                    'tahun' => 'required',
                ]);

                Rekening::create([
                    'bulan' => $request->input('bulan'),
                    'debet' => $request->input('debet'),
                    'kredit' => $request->input('kredit'),
                    'saldo' => $request->input('saldo'),
                    'saldo_awal' => $request->input('saldo_awal'),
                    'setor' => $request->input('setor'),
                    'bunga_bank' => $request->input('bunga_bank'),
                    'pajak' => $request->input('pajak'),
                    'ADM' => $request->input('ADM'),
                    'penarikan' => $request->input('penarikan'),
                    'nominal' => $request->input('nominal'),
                    'tahun' => $request->input('tahun'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Thowrable $th) {
                return response()->json(['message' => 'Gagal Login, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Sorry anda bukan admin'], 401);
    }
}
