<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\Rekening;
use App\Models\TrRekening;
use App\Models\Tunai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

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
                    'id' => Str::uuid(),
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
            try {
                $request->validate([
                    'bulan' => 'string|required',
                    'tahun' => 'integer|required',
                    'masuk' => 'nullable|integer',
                    'keluar' => 'nullable|integer',
                ]);

                $id_kas = Kas::where('name', 'rekening')
                    ->where('tahun', date('Y'))
                    ->first();

                $saldo = Tunai::where('tahun', date('Y'))
                    ->orderBy('created_at', 'desc')
                    ->first();


                Tunai::create([
                    'id' => Str::uuid(),
                    'id_kas' => $id_kas->id,
                    'bulan' => $request->input('bulan'),
                    'tahun' => $request->input('tahun'),
                    'masuk' => $request->input('masuk'),
                    'keluar' => $request->input('keluar'),
                    'saldo' => $saldo
                        ? $saldo->saldo + $request->input('masuk') - $request->input('keluar')
                        : $request->input('saldo_awal') + $request->input('masuk') - $request->input('keluar'),
                ]);

                return response()->json(['message' => 'Berhasil menambahkan data bulan ' . $request->input('bulan')], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal menambahkan data, silahkan coba lagi!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    public function kasRekening(Request $request)
    {
        // get user is admin
        if (Auth::guard('admin')->check()) {
            try {
                $request->validate([
                    'bulan' => 'required|string',
                    'tahun' => 'required|integer',
                    'nominal' => 'integer|required',
                    'type' => 'string|required',
                    'rekening' => 'string|required',
                ]);

                $id_kas = Kas::where('name', 'rekening')
                    ->where('tahun', date('Y'))
                    ->first();

                $rekening = Rekening::where('bulan', $request->input('bulan'))
                    ->where('tahun', date('Y'))
                    ->first();

                $saldo = TrRekening::orderBy('created_at', 'desc')
                    ->first();

                if ($request->input('type') === 'setor' || $request->input('type') === 'bunga_bank') {
                    $totalSaldo = $saldo
                        ? $saldo->saldo + $request->input('nominal')
                        : $request->saldo_awal + $request->input('nominal');
                } else {
                    $totalSaldo = $saldo
                        ? $saldo->saldo - $request->input('nominal')
                        : $request->saldo_awal - $request->input('nominal');
                }

                // cek sudah set saldo awal atau belum
                if ($id_kas) {
                    if ($rekening) {
                        $tr_rekening = TrRekening::where('id_rekening', $rekening->id_rekening)
                            ->where('type', $request->input('type'))
                            ->first();


                        if (!$tr_rekening) {
                            TrRekening::create([
                                'id_tr_rekening' => Str::uuid(),
                                'id_rekening' => $rekening->id_rekening,
                                'nominal' => $request->input('nominal'),
                                'type' => $request->input('type'),
                                'rekening' => $request->input('rekening'),
                                'saldo' => $totalSaldo,
                            ]);

                            return response()->json(['message' => 'Berhasil menambahkan data bulan ' . $request->input('bulan')], 200);
                        }

                        return response()->json(['message' => 'Sepertinya anda sudah mengisi ini, silahkan lihat datanya!'], 302);
                    }

                    Rekening::create([
                        'id_rekening' => Str::uuid(),
                        'id_kas' => $id_kas->id,
                        'bulan' => $request->input('bulan'),
                        'tahun' => $request->input('tahun'),
                    ]);

                    $rekening_create = Rekening::where('tahun', $request->input('tahun'))
                        ->where('bulan', $request->input('bulan'))
                        ->orderBy('created_at', 'desc')
                        ->first();

                    $tr_rekening = TrRekening::where('id_rekening', $rekening_create->id_rekening)
                        ->where('type', $request->input('type'))
                        ->first();

                    if (!$tr_rekening) {
                        TrRekening::create([
                            'id_tr_rekening' => Str::uuid(),
                            'id_rekening' => $rekening_create->id_rekening,
                            'nominal' => $request->input('nominal'),
                            'type' => $request->input('type'),
                            'rekening' => $request->input('rekening'),
                            'saldo' => $totalSaldo
                        ]);

                        return response()->json(['message' => 'Berhasil menambahkan data bulan ' . $request->input('bulan')], 200);
                    }

                    return response()->json(['message' => 'Sepertinya anda sudah mengisi ini, silahkan lihat datanya!'], 302);
                }

                return response()->json(['message' => 'Silahkan set saldo awal terlebih dahulu!'], 500);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal menambahkan data, silahkan coba lagi!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }
}
