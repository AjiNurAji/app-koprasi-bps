<?php

namespace App\Http\Controllers;

use App\Models\BayarPinjaman;
use App\Models\JasaAnggota;
use App\Models\Member;
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

            $member = Member::where('NIP', $request->input('nip'))->first();

            $pinjaman = Pinjaman::where([
                ['id_member', $member->id_member],
                ['tahun', $request->input('tahun')],
            ])
                ->orderBy('created_at', 'desc')
                ->get()
                ->first();

            $simpananTaunSebelumnya = Pinjaman::where([
                ['id_member', $member->id_member],
                ['tahun', ($request->input('tahun') - 1)]
            ])
                ->orderBy('created_at', 'desc')
                ->get()
                ->first();

            $jasaAnggota = JasaAnggota::orderBy('created_at', 'desc')
                ->get()
                ->first();

            $bayar = BayarPinjaman::where([
                ['id_member', $member->id_member],
            ])
                ->orderBy('created_at', 'desc')
                ->get()
                ->first();

            if (!$jasaAnggota) {
                return response()->json(['message' => 'Mohon set jasa anggota terlebih dahulu!', 'redirect' => route('jasa_piutang')], 404);
            }

            $pinjaman['jasa_anggota'] = $jasaAnggota->persentase;
            isset($pinjaman['sisa']) ?? $pinjaman['sisa'] = $bayar ? $bayar->sisa : $pinjaman->sisa;

            $awal_tahun = $simpananTaunSebelumnya ? $simpananTaunSebelumnya->sisa : null;

            if ($pinjaman) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member, 'pinjaman' => $pinjaman, 'sebelum' => $awal_tahun], 200);
            }


            return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member, 'sebelum' => $awal_tahun], 200);
        }

        return response()->json(['message' => 'Hanya bisa dakses oleh admin!'], 401);
    }

    public function getBayarPinjamanAnggota(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            $pinjaman = Pinjaman::where([
                ['id_member', $request->input('id_member')],
                ['tahun', $request->input('tahun')],
            ])
                ->orderBy('created_at', 'desc')
                ->get();


            $bayar = BayarPinjaman::where([
                ['id_member', $request->input('id_member')],
            ])
                ->orderBy('created_at', 'desc')
                ->get();

            $pinjaman['sisa'] = $pinjaman ? $pinjaman->sum('nominal') - ($bayar ? $bayar->sum('nominal') : 0) : 0;

            if ($bayar) {
                $terbayar = BayarPinjaman::where([
                    ['id_member', $request->input('id_member')],
                ])
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->first();

                if (isset($terbayar->sisa) && !$terbayar->sisa)
                    return response()->json(['message' => 'Pinjaman sudah terbayar!'], 500);
            }

            if ($pinjaman) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'pinjaman' => $pinjaman], 200);
            }
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
                    'total_pinjaman' => 'integer|nullable',
                ]);

                $pinjaman = Pinjaman::where('id_member', $request->input('id_member'))
                    ->orderBy('created_at', 'desc')
                    ->get()->first();

                $terbayar = BayarPinjaman::where([
                    ['id_member', $request->input('id_member')],
                ])
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->first();

                $sisa = ($terbayar ? $terbayar->sisa + $request->input('total_pinjaman') : $pinjaman) ? $pinjaman->sisa + $request->input('total_pinjaman') : $request->input('total_pinjaman');

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal_keluar' => $request->input('total_pinjaman'),
                    'type' => 'pinjaman',
                    'nama_transaksi' => 'pinjaman',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                Pinjaman::create([
                    'id_pinjaman' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $request->input('total_pinjaman'),
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'sisa' => $sisa,
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa dakses oleh admin!'], 401);
    }

    public function bayarPinjamanAnggota(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'hari' => 'required|string',
                    'nominal' => 'integer|nullable',
                ]);

                $pinjaman = Pinjaman::where([
                    ['id_member', $request->input('id_member')],
                ])
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->first();

                $bayar = BayarPinjaman::where([
                    ['id_member', $request->input('id_member')],
                    ['id_pinjaman', $pinjaman->id_pinjaman]
                ])
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->first();

                $sisa = $bayar ? $bayar->sisa - $request->input('nominal') : $pinjaman->sisa - $request->input('nominal');

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $request->input('nominal'),
                    'type' => 'pinjaman',
                    'nama_transaksi' => 'bayar_pinjaman',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                BayarPinjaman::create([
                    'id_bayar_pinjaman' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $request->input('nominal'),
                    'id_pinjaman' => $pinjaman->id_pinjaman,
                    'sisa' => $sisa,
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'jenis' => $request->input('jenis_bayar'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa dakses oleh admin!'], 401);
    }
}
