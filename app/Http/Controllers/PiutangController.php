<?php

namespace App\Http\Controllers;

use App\Models\JasaAnggota;
use App\Models\Pinjaman;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PiutangController extends Controller
{
    public function setJasaAnggota(Request $request)
    {
        if (Auth::guard('admin')->check()) {
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

    public function getPinjamanAnggota(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            $pinjaman = Pinjaman::where('id_member', $request->input('id_member'))
                ->where('tahun', $request->input('tahun'))
                ->first();

            $simpananTaunSebelumnya = Pinjaman::where('id_member', $request->input('id_member'))
                ->where('tahun', ($request->input('tahun') - 1))
                ->first();

            $awal_tahun = $simpananTaunSebelumnya ? $simpananTaunSebelumnya->sisa : null;

            if ($pinjaman) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'pinjaman' => $pinjaman, 'sebelum' => $awal_tahun], 200);
            }

            return response()->json(['message' => 'Data berhasil didapatkan', 'sebelum' => $awal_tahun], 200);
        }

        return response()->json(['message' => 'Hanya bisa dakses oleh admin!'], 401);
    }

    public function pinjamanAnggota(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'hari' => 'required|string',
                    'nominal' => 'integer|required',
                ]);

                $pinjaman = Pinjaman::where('id_member', $request->input('id_member'))
                    ->where('tahun', $request->input('tahun'))
                    ->first();

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal_keluar' => $request->input('nominal'),
                    'type' => 'pinjaman',
                    'nama_transaksi' => 'pinjaman',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                Pinjaman::create([
                    'id_pinjaman' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $request->input('nominal'),
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'sisa' => $pinjaman ? $pinjaman->sisa + $request->input('nominal') : $request->input('nominal'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa dakses oleh admin!'], 401);
    }
}
