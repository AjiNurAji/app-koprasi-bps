<?php

namespace App\Http\Controllers;

use App\Models\JasaAnggota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PiutangController extends Controller
{
    public function setJasaAnggota(Request $request)
    {
        if(Auth::guard('admin')->check()) {
            try {
                $request->validate([
                    'persentase' => 'required|integer|min:0|max:100',
                ]);

                JasaAnggota::create([
                    'persentase' => $request->input('persentase')
                ]);

                return response()->json(['message' => 'Berhasi menambahkan'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Terjadi kesalahan, silahkan coba lagi!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa diakses oleh admin!'], 401);
    }
}
