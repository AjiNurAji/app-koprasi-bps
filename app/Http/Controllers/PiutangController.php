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

            if (!$member) return response()->json(['message' => 'Data tidak ditemukan!'], 404);

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

            $member = Member::where('NIP', $request->input('nip'))->first();

            if (!$member) return response()->json(['message' => 'Data tidak ditemukan!'], 404);

            $pinjaman = Pinjaman::where([
                ['id_member', $member->id_member],
            ])
                ->orderBy('created_at', 'desc')
                ->get();


            $bayar = BayarPinjaman::where([
                ['id_member', $member->id_member],
            ])
                ->orderBy('created_at', 'desc')
                ->get();

            $total = $pinjaman->sum('nominal');

            $sisa = $pinjaman ? $total - ($bayar ? $bayar->sum('nominal') : 0) : 0;

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
                return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member, 'pinjaman' => [
                    'pinjaman' => $pinjaman,
                    'bayar' => $bayar,
                    'sisa' => $sisa,
                    'total' => $total
                ]], 200);
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
                    'date' => 'required',
                    'keperluan' => 'required|string',
                    'bank_tujuan' => 'required|string',
                    'jangka_waktu' => 'required|string',
                ]);

                if (date("Y", strtotime($request->input("date"))) > date("Y")) return response()->json(['message' => 'Tahun yang dimasukkan tidak valid!'], 500); 
                
                $pinjaman = Pinjaman::where('id_member', $request->input('id_member'))
                    ->orderBy('tanggal_pinjam', 'desc')
                    ->get()->first();

                $terbayar = BayarPinjaman::where([
                    ['id_member', $request->input('id_member')],
                ])
                    ->orderBy('tanggal_bayar', 'desc')
                    ->get()
                    ->first();

                $nominal = $terbayar ? $terbayar->sisa + $request->input('total_pinjaman') : ($pinjaman ? $pinjaman->sisa + $request->input('total_pinjaman') : $request->input('total_pinjaman'));

                // dd($nominal);

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal_keluar' => $request->input('total_pinjaman'),
                    'name' => $request->input('name'),
                    'tanggal_transaksi' => $request->input('date'),
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
                    'name' => $request->input('name'),
                    'bulan' => $request->input('bulan'),
                    'hari' => $request->input('hari'),
                    'tahun' => $request->input('tahun'),
                    'bank_tujuan' => $request->input('bank_tujuan'),
                    'untuk_keperluan' => $request->input('keperluan'),
                    'jangka_waktu' => $request->input('jangka_waktu'),
                    'no_rek' => $request->input('no_rek'),
                    'tanggal_pinjam' => $request->input('date'),
                    'sisa' => $nominal,
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
                    'method' => 'required|string',
                    'jenis_bayar' => 'required|string',
                    'catatan' => 'required|string',
                ]);

                $pinjaman = Pinjaman::whereBetween('tahun', [date('Y') - 1, date('Y')])->where([
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
                    'name' => $request->input('name'),
                    'nominal' => $request->input('nominal'),
                    'type' => 'pinjaman',
                    'nama_transaksi' => 'bayar_pinjaman',
                    'tanggal_transaksi' => $request->input('date'),
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                BayarPinjaman::create([
                    'id_bayar_pinjaman' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'name' => $request->input('name'),
                    'nominal' => $request->input('nominal'),
                    'id_pinjaman' => $pinjaman->id_pinjaman,
                    'tanggal_bayar' => $request->input('date'),
                    'sisa' => $sisa,
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'jenis' => $request->input('jenis_bayar'),
                    'method' => $request->input('method'),
                    'note' => $request->input('catatan'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa dakses oleh admin!'], 401);
    }
}
