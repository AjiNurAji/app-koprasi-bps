<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\Tunai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KasController extends Controller
{
    public function setSaldoAwal(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            $request->validate([
                'name' => 'string|required',
                'saldo_awal' => 'integer|required',
                'tahun' => 'integer|required'
            ]);
    
            try {
                Kas::create([
                    'name' => $request->input('name'),
                    'saldo_awal' => $request->input('saldo_awal'),
                    'tahun' => $request->input('tahun'),
                ]);

                return response()->json(['message' => 'Berhasil menambahkan saldo'], 201);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal menambahkam saldo, silahkan coba lagi!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa diakses oleh admin!'], 401);
    }

    public function kasTunai(Request $request)
    {
        // get user is admin
        if (Auth::guard('admin')->check()) {
            $request->validate([
                'bulan' => 'string|required',
                'tahun' => 'integer|required',
                'masuk' => 'nullable|integer',
                'keluar' => 'nullable|integer',
            ]);

            $saldo = Tunai::where('tahun', date('Y'))
                ->orderBy('created_at', 'desc')
                ->first();

            Tunai::create([
                'id_kas' => 1,
                'bulan' => $request->input('bulan'),
                'tahun' => $request->input('tahun'),
                'masuk' => $request->input('masuk'),
                'keluar' => $request->input('keluar'),
                'saldo' => $saldo
                    ? $saldo->saldo + $request->input('masuk') - $request->input('keluar')
                    : $request->input('saldo_awal') + $request->input('masuk') - $request->input('keluar'),
            ]);

            return response()->json(['message' => 'Berhasil menambahkan data bulan ' . $request->input('bulan')], 200);
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }
}
