<?php

namespace App\Http\Controllers;

use App\Models\AmbilSimpanan;
use App\Models\Member;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\SimpananPokok;
use App\Models\SimpananSukarela;
use App\Models\SimpananWajib;
use Carbon\Carbon;

class SimpananController extends Controller
{

    public function getDataSimpananPokok(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            $member = Member::where('NIP', $request->input('nip'))->first();

            if (!$member) return response()->json(['message' => 'Data tidak ditemukan!'], 404);

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
                    'hari' => 'required|string',
                    'awal_tahun' => 'integer|nullable',
                    'anggota_keluar' => 'integer|nullable',
                    'anggota_masuk' => 'integer|nullable'
                ]);

                // ambil data simpanan pokok untuk validasi nominal
                $simpananPokok = SimpananPokok::where([
                    ['id_member', $request->input('id_member')],
                    ['tahun', date('Y')]
                ])->get();

                $nominal = $request->input('anggota_masuk');
                $keluar = $request->input('anggota_keluar');

                // ketika nominal keluar lebih dari nominal masuk =======================
                if (isset($simpananPokok) && ($simpananPokok->sum('anggota_keluar') + $request->input('anggota_keluar')) > ($simpananPokok->sum('anggota_masuk') + $request->input('anggota_masuk'))) return response()->json(['message' => 'Nominal anggota keluar melebihi anggota masuk'], 500);
                // ========================================================

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'name' => $request->input('name'),
                    'tanggal_transaksi' => $request->input('date'),
                    'nominal' => $nominal,
                    'nominal_keluar' => $keluar,
                    'type' => 'simpanan',
                    'nama_transaksi' => 'simpanan_pokok',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                ]);

                SimpananPokok::create([
                    'id_simpanan_pokok' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'name' => $request->input('name'),
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'tanggal_transaksi' => $request->input('date'),
                    'awal_tahun' => $request->input('awal_tahun'),
                    'anggota_masuk' => $request->input('anggota_masuk'),
                    'anggota_keluar' => $request->input('anggota_keluar'),
                ]);
                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    // Simpanan Wajib
    public function getDataSimpananWajib(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            // cari data anggota ============================
            $member = Member::where('NIP', $request->input('nip'))->first();
            // =====================

            // jika tidak ditemukan ======================
            if (!$member) return response()->json(['message' => 'Data tidak ditemukan!'], 404);
            // =========================

            // jika ditemukan lanjut proses pengambilan data simpanan wajib ======
            $simpananWajib = SimpananWajib::where('id_member', $member->id_member)
                ->where('tahun', $request->input('tahun'))
                ->get();

            $simpananTaunSebelumnya = SimpananWajib::where('id_member', $member->id_member)
                ->where('tahun', ($request->input('tahun') - 1))
                ->get();
            // ===============================================================

            // nominal anggota keluar ==================================
            $anggotaKeluar = AmbilSimpanan::whereBetween('created_at', [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])
                ->where(
                    [
                        ['id_member', $member->id_member],
                        ['simpanan', 'wajib']
                    ]
                )->get()->sum('nominal');

            $anggotaKeluarSebelumnya = AmbilSimpanan::whereBetween('created_at', [Carbon::createFromDate(date('Y') - 1)->startOfYear(), Carbon::createFromDate(date('Y') - 1)->endOfYear()])
                ->where(
                    [
                        ['id_member', $member->id_member],
                        ['simpanan', 'wajib']
                    ]
                )->get()->sum('nominal');
            // ============================================================

            // set sisa nominal simpanan ==================================== 
            $nominalSimpanan = $simpananWajib->sum('kekayaan_awal_tahun') + $simpananWajib->sum('simpanan_wajib') - $anggotaKeluar;
            // ==========================================

            // set sisa simpanan awal tahun ======================================
            $awal_tahun = $simpananTaunSebelumnya ? $simpananTaunSebelumnya->sum('simpanan_wajib') - $anggotaKeluarSebelumnya : 0;
            // =======================================================

            if ($simpananWajib) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'simpanan' => $simpananWajib, 'member' => $member, 'sebelum' => $awal_tahun, 'anggota_keluar' => $anggotaKeluar, 'nominal_simpanan' => $nominalSimpanan], 200);
            }

            return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member, 'sebelum' => $awal_tahun, 'anggota_keluar' => $anggotaKeluar, 'nominal_simpanan' => $nominalSimpanan], 200);
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
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
                    'kekayaan_awal_tahun' => 'integer|nullable',
                    'simpanan_wajib' => 'integer|nullable',
                    'name' => 'required|string',
                ]);

                // get simpanan wajib ============================
                // $simpananWajib = SimpananWajib::where('id_member', $request->input('id_member'))
                //     ->where('bulan', $request->input('bulan'))
                //     ->first();
                // ============================================

                // set nominal simpanan ==============================================
                $nominal = $request->input('simpanan_wajib');
                // ===============================================


                // buatkan history transaksi dan simpanan wajib =================================
                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'tanggal_transaksi' => $request->input('date'),
                    'name' => $request->input('name'),
                    'nominal' => $nominal,
                    'type' => 'simpanan',
                    'nama_transaksi' => 'simpanan_wajib',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                SimpananWajib::create([
                    'id_simpanan_wajib' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'tanggal_transaksi' => $request->input('date'),
                    'name' => $request->input('name'),
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'kekayaan_awal_tahun' => $request->input('kekayaan_awal_tahun'),
                    'simpanan_wajib' => $nominal,
                ]);
                // ===============================================================

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    public function ambilSimpananWajib(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'name' => 'required|string',
                    'nominal' => 'required|integer',
                    'note' => 'required|string',
                    'date' => 'required|string',
                ]);

                // get total simpanan wajib ===========================
                $anggotaKeluar = AmbilSimpanan::whereBetween('created_at', [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])
                    ->where(
                        [
                            ['id_member', $request->input('id_member')],
                            ['simpanan', 'wajib']
                        ]
                    )->get()->sum('nominal');

                $simpanan = SimpananWajib::where([['id_member', $request->input('id_member')], ['tahun', date('Y')]])->get();

                $nominal = $simpanan->sum('kekayaan_awal_tahun') + $simpanan->sum('simpanan_wajib') - $anggotaKeluar;
                // =============================

                // validasi ketika nominal ambil melebihi total simpanan ================
                if ($request->input('nominal') > $nominal) {
                    return response()->json(['message' => 'Nominal ambil melebih total simpanan!'], 500);
                }
                // ==============================================

                // buatkan history transaksi dan ambilsimpanan ketika tidak ada kesalahan =============
                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'name' => $request->input('name'),
                    'nominal_keluar' => $request->input('nominal'),
                    'type' => 'simpanan',
                    'nama_transaksi' => 'ambil_simpanan_wajib',
                    'tanggal_transaksi' => $request->input('date'),
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                AmbilSimpanan::create([
                    '_id' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'name' => $request->input('name'),
                    'nominal' => $request->input('nominal'),
                    'tanggal_ambil' => $request->input('date'),
                    'simpanan' => 'wajib',
                    'note' => $request->input('note'),
                ]);
                // =======================================================

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

            $member = Member::where('NIP', $request->input('nip'))->first();

            if (!$member) return response()->json(['message' => 'Data tidak ditemukan!'], 404);

            $simpananSukarela = SimpananSukarela::where([['tahun', $request->input('tahun')], ['id_member', $member->id_member]])->first();

            if ($simpananSukarela) {
                return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member, 'simpanan' => $simpananSukarela], 200);
            }

            return response()->json(['message' => 'Data berhasil didapatkan', 'member' => $member], 200);
        }

        return response()->json(['message' => 'Hanya bisa diakses oleh admin!'], 401);
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
                    'selama_tahun' => 'integer|nullable',
                    'disimpan_kembali' => 'integer|nullable',
                ]);

                // simpanan wajib update
                $simpananSukarela = SimpananSukarela::where('id_member', $request->input('id_member'))
                    ->where('tahun', $request->input('tahun'))
                    ->first();

                $awal_tahun = $request->input('sukarela') + $request->input('shu');

                $nominal = $request->input('selama_tahun');

                $akhirTahun = ($simpananSukarela ? $simpananSukarela->akhir_tahun : 0) + $nominal + (!$simpananSukarela ? $awal_tahun : 0);

                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'nominal' => $nominal,
                    'name' => $request->input('name'),
                    'type' => 'simpanan',
                    'tanggal_transaksi' => $request->input('date'),
                    'nama_transaksi' => 'simpanan_sukarela',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);
                
                SimpananSukarela::create([
                    'id_simpanan_sukarela' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'tanggal_transaksi' => $request->input('date'),
                    'tahun' => $request->input('tahun'),
                    'name' => $request->input('name'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'sukarela' => $simpananSukarela ? $simpananSukarela->sukarela : $request->input('sukarela'),
                    'shu' => $simpananSukarela ? $simpananSukarela->shu :  $request->input('shu'),
                    'awal_tahun' => $simpananSukarela ? $simpananSukarela->awal_tahun : $awal_tahun,
                    'selama_tahun' => $request->input('selama_tahun'),
                    'akhir_taun' => $akhirTahun,
                ]);

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    public function ambilSimpananSukarela(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                // validasi request
                $request->validate([
                    'id_member' => 'required|string',
                    'tahun' => 'required|integer',
                    'bulan' => 'required|string',
                    'name' => 'required|string',
                    'nominal' => 'required|integer',
                    'note' => 'required|string',
                    'date' => 'required|string',
                ]);

                $simpanan = SimpananSukarela::where([['id_member', $request->input('id_member')]])
                    ->orderBy('created_at', 'desc')
                    ->get();
                    
                if (!$simpanan->count()) return response()->json(['message' => 'Tidak ada data simpanan sukarela atas nama '.ucwords($request->input('name')) ], 404);

                // get total simpanan sukarela ===========================
                $diambil = AmbilSimpanan::whereBetween('created_at', [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])
                    ->where(
                        [
                            ['id_member', $request->input('id_member')],
                            ['simpanan', 'sukarela']
                        ]
                    )->get()->sum('nominal');


                $oneSimpanan = $simpanan->first();

                $nominal = $oneSimpanan->awal_tahun + $simpanan->sum('selama_tahun') - $diambil;

                $akhir_tahun = $oneSimpanan->akhir_taun - $request->input('nominal') + $request->input('disimpan_kembali') ?? $request->input('disimpan_kembali');
                // =============================

                // validasi ketika nominal ambil melebihi total simpanan ================
                if ($request->input('nominal') > $nominal) {
                    return response()->json(['message' => 'Nominal ambil melebih total simpanan!'], 500);
                }
                // ==============================================

                // buatkan history transaksi dan ambilsimpanan ketika tidak ada kesalahan =============
                Transaksi::create([
                    'id_transaksi' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'name' => $request->input('name'),
                    'nominal_keluar' => $request->input('nominal'),
                    'tanggal_transaksi' => $request->input('date'),
                    'type' => 'simpanan',
                    'nama_transaksi' => 'ambil_simpanan_sukarela',
                    'tahun' => $request->input('tahun'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan')
                ]);

                AmbilSimpanan::create([
                    '_id' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'name' => $request->input('name'),
                    'nominal' => $request->input('nominal'),
                    'tanggal_ambil' => $request->input('date'),
                    'simpanan' => 'sukarela',
                    'note' => $request->input('note'),
                ]);

                SimpananSukarela::create([
                    'id_simpanan_sukarela' => Str::uuid(),
                    'id_member' => $request->input('id_member'),
                    'tahun' => $request->input('tahun'),
                    'tanggal_transaksi' => $request->input('date'),
                    'name' => $request->input('name'),
                    'hari' => $request->input('hari'),
                    'bulan' => $request->input('bulan'),
                    'disimpan_kembali' => $request->input('disimpan_kembali'),
                    'sukarela' => $oneSimpanan->sukarela,
                    'shu' => $oneSimpanan->shu,
                    'awal_tahun' => $oneSimpanan->awal_tahun,
                    'akhir_taun' => $akhir_tahun,
                ]);
                // =======================================================

                return response()->json(['message' => 'Berhasil melakukan transaksi'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal melakukan transaksi, coba lagi nanti!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }
}
