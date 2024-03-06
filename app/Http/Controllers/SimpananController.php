<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\SimpananPokok;
use App\Models\SimpananSukarela;
use App\Models\SimpananWajib;

class SimpananController extends Controller
{

    public function getDataSimpananPokok(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            $member = Member::where('NIP', $request->input('nip'))->first();

            if ($member) {
                $simpananPokok = SimpananPokok::where('id_member', $member->id_member)
                    ->where('tahun', $request->input('tahun'))
                    ->first();

                $simpananTaunSebelumnya = SimpananPokok::where('id_member', $member->id_member)
                    ->where('tahun', ($request->input('tahun') - 1))
                    ->first();

                $awal_tahun = $simpananTaunSebelumnya ? $simpananTaunSebelumnya->awal_tahun + $simpananTaunSebelumnya->anggota_masuk - $simpananTaunSebelumnya->anggota_keluar : null;

                if ($simpananPokok) {
                    return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member, 'simpanan' => $simpananPokok, 'sebelum' => $awal_tahun], 200);
                }

                return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member, 'sebelum' => $awal_tahun], 200);
            }

            return response()->json(['message' => 'Data tidak ditemukan!'], 404);
        }

        return response()->json(['message' => 'Hanya bisa diakses oleh admin!'], 401);
    }

    public function simpananPokok(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'awal_tahun' => 'integer|nullable',
                    'anggota_keluar' => 'integer|nullable',
                    'anggota_masuk' => 'integer|nullable'
                ]);

                // cek transaksi apa aja yang sudah dilakukan
                $simpananPokok = SimpananPokok::where('id_member', $request->input('id_member'))
                    ->where('bulan', $request->input('bulan'))
                    ->first();

                $nominal = $request->input('anggota_masuk') + $request->input('awal_tahun');
                $keluar = $request->input('anggota_keluar');

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $nominal,
                    'type' => 'simpanan',
                    'nominal_keluar' => $keluar,
                    'nama_transaksi' => 'simpanan_pokok',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                if (!$simpananPokok) {
                    SimpananPokok::create([
                        'id_simpanan_pokok' => Str::uuid(),
                        'id_member' => $request->input('id_member'),
                        'tahun' => $request->input('tahun'),
                        'hari' => $request->input('hari'),
                        'bulan' => $request->input('bulan'),
                        'awal_tahun' => $simpananPokok ? $simpananPokok->awal_tahun + $request->input('awal_tahun') : $request->input('awal_tahun'),
                        'anggota_masuk' => $simpananPokok ? $simpananPokok->anggota_masuk + $request->input('anggota_masuk') : $request->input('anggota_masuk'),
                        'anggota_keluar' => $simpananPokok ? $simpananPokok->anggota_keluar + $request->input('anggota_keluar') : $request->input('anggota_keluar'),

                    ]);
                    return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
                }

                $simpananPokok->update([
                    'awal_tahun' => $simpananPokok->awal_tahun ? $simpananPokok->awal_tahun + $request->input('awal_tahun') : $request->input('awal_tahun'),
                    'hari' => $request->input('hari'),
                    'anggota_masuk' => $simpananPokok->anggota_masuk ? $simpananPokok->anggota_masuk + $request->input('anggota_masuk') : $request->input('anggota_masuk'),
                    'anggota_keluar' => $simpananPokok->anggota_keluar ? $simpananPokok->anggota_keluar + $request->input('anggota_keluar') : $request->input('anggota_keluar'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    public function getDataSimpananWajib(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            $simpananWajib = SimpananWajib::where('id_member', $request->input('id_member'))
                ->where('tahun', $request->input('tahun'))
                ->first();

            $simpananTaunSebelumnya = SimpananWajib::where('id_member', $request->input('id_member'))
                ->where('tahun', ($request->input('tahun') - 1))
                ->first();

            $awal_tahun = $simpananTaunSebelumnya ? $simpananTaunSebelumnya->kekayaan_awal_tahun + $simpananTaunSebelumnya->simpanan_wajib - $simpananTaunSebelumnya->anggota_keluar : 0;

            if ($simpananWajib) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'simpanan' => $simpananWajib, 'sebelum' => $awal_tahun], 200);
            }

            return response()->json(['message' => 'Data berhasil didapatkan', 'sebelum' => $awal_tahun], 200);
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }

    public function simpananWajib(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'awal_tahun' => 'integer|nullable',
                    'anggota_keluar' => 'integer|nullable',
                    'simpanan_wajib' => 'integer|nullable',
                ]);

                // simpanan wajib update
                $simpananWajib = SimpananWajib::where('id_member', $request->input('id_member'))
                    ->where('bulan', $request->input('bulan'))
                    ->first();

                $nominal = $request->input('simpanan_wajib') + $request->input('awal_tahun');
                $keluar = $request->input('anggota_keluar');

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $nominal,
                    'type' => 'simpanan',
                    'nominal_keluar' => $keluar,
                    'nama_transaksi' => 'simpanan_wajib',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                if (!$simpananWajib) {
                    SimpananWajib::create([
                        'id_simpanan_wajib' => Str::uuid(),
                        'id_member' => $request->input('id_member'),
                        'tahun' => $request->input('tahun'),
                        'hari' => $request->input('hari'),
                        'bulan' => $request->input('bulan'),
                        'kekayaan_awal_tahun' => $simpananWajib ? $simpananWajib->kekayaan_awal_tahun + $request->input('awal_tahun') : $request->input('awal_tahun'),
                        'simpanan_wajib' => $simpananWajib ? $simpananWajib->simpanan_wajib + $request->input('simpanan_wajib') : $request->input('simpanan_wajib'),
                        'anggota_keluar' => $simpananWajib ? $simpananWajib->anggota_keluar + $request->input('anggota_keluar') : $request->input('anggota_keluar'),
                    ]);
                    return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
                }

                $simpananWajib->update([
                    'kekayaan_awal_tahun' => $simpananWajib->kekayaan_awal_tahun ? $simpananWajib->kekayaan_awal_tahun + $request->input('awal_tahun') : $request->input('awal_tahun'),
                    'hari' => $request->input('hari'),
                    'simpanan_wajib' => $simpananWajib->simpanan_wajib ? $simpananWajib->simpanan_wajib + $request->input('simpanan_wajib') : $request->input('simpanan_wajib'),
                    'anggota_keluar' => $simpananWajib->anggota_keluar ? $simpananWajib->anggota_keluar + $request->input('anggota_keluar') : $request->input('anggota_keluar'),
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    public function getDataSimpananSukarela(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            $simpananSukarela = SimpananSukarela::where('id_member', $request->input('id_member'))->where('tahun', $request->input('tahun'))->first();
            if ($simpananSukarela) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'simpanan' => $simpananSukarela], 200);
            }

            return response()->json(['message' => 'Data berhasil didapatkan'], 200);
        }

        return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }

    public function simpananSukarela(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'sukarela' => 'integer|nullable',
                    'shu' => 'integer|nullable',
                    'selama_tahun' => 'integer|nullable',
                    'diambil' => 'integer|nullable',
                    'disimpan_kembali' => 'integer|nullable',
                ]);

                // simpanan wajib update
                $simpananSukarela = SimpananSukarela::where('id_member', $request->input('id_member'))
                    ->where('bulan', $request->input('bulan'))
                    ->first();

                $awal_tahun = $request->input('sukarela') + $request->input('shu');

                $nominal =  $awal_tahun +
                    $request->input('selama_tahun');

                $keluar = $request->input('diambil');

                $akhirTahun = $nominal - $keluar + $request->input('disimpan_kembali');

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $nominal,
                    'type' => 'simpanan',
                    'nominal_keluar' => $keluar,
                    'nama_transaksi' => 'simpanan_sukarela',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                if (!$simpananSukarela) {
                    SimpananSukarela::create([
                        'id_simpanan_sukarela' => Str::uuid(),
                        'id_member' => $request->input('id_member'),
                        'tahun' => $request->input('tahun'),
                        'hari' => $request->input('hari'),
                        'bulan' => $request->input('bulan'),
                        'sukarela' =>   $simpananSukarela
                            ? $simpananSukarela->sukarela + $request->input('sukarela')
                            : $request->input('sukarela'),
                        'shu' =>    $simpananSukarela
                            ? $simpananSukarela->shu + $request->input('shu')
                            : $request->input('shu'),

                        'awal_tahun' => $simpananSukarela
                            ? $simpananSukarela->awal_tahun + $awal_tahun
                            : $awal_tahun,

                        'selama_tahun' => $simpananSukarela
                            ? $simpananSukarela->selama_tahun + $request->input('selama_tahun')
                            : $request->input('selama_tahun'),

                        'diambil' => $simpananSukarela
                            ? $simpananSukarela->diambil + $request->input('diambil')
                            : $request->input('diambil'),

                        'disimpan_kembali' => $simpananSukarela
                            ? $simpananSukarela->disimpan_kembali + $request->input('disimpan_kembali')
                            : $request->input('disimpan_kembali'),

                        'akhir_taun' => $simpananSukarela
                            ? $simpananSukarela->akhir_taun + $akhirTahun
                            : $akhirTahun,
                    ]);
                    return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
                }

                $simpananSukarela->update([
                    'sukarela' =>   $simpananSukarela->sukarela
                        ? $simpananSukarela->sukarela + $request->input('sukarela')
                        : $request->input('sukarela'),

                    'hari' => $request->input('hari'),
                    'shu' =>    $simpananSukarela->shu
                        ? $simpananSukarela->shu + $request->input('shu')
                        : $request->input('shu'),

                    'awal_tahun' => $simpananSukarela->awal_tahun
                        ? $simpananSukarela->awal_tahun + $awal_tahun
                        : $awal_tahun,

                    'selama_tahun' => $simpananSukarela->selama_tahun
                        ? $simpananSukarela->selama_tahun + $request->input('selama_tahun')
                        : $request->input('selama_tahun'),

                    'diambil' => $simpananSukarela->diambil
                        ? $simpananSukarela->diambil + $request->input('diambil')
                        : $request->input('diambil'),

                    'disimpan_kembali' => $simpananSukarela->disimpan_kembali
                        ? $simpananSukarela->disimpan_kembali + $request->input('disimpan_kembali')
                        : $request->input('disimpan_kembali'),

                    'akhir_taun' => $simpananSukarela->akhir_taun
                        ? $simpananSukarela->akhir_taun + $akhirTahun
                        : $akhirTahun,
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }
}
