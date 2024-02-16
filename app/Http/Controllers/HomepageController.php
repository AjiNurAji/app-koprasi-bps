<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\SimpananPokok;
use App\Models\SimpananWajib;
use App\Models\Member;
use App\Models\Transaksi;
use App\Models\Tunai;
use App\Models\User;
use Carbon\Carbon;

class HomepageController extends Controller
{
    // halaman dashboard
    public function index()
    {
        $bulan = [
            [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember',
            ]
        ];

        $hari = [
            [
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
                'Minggu'
            ]
        ];

        // simpanan chart
        foreach ($bulan as $item) {
            for ($i = 0; $i < 12; $i++) {
                $simpananPokokCount[] = Transaksi::whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                    ->where('bulan', $item[$i])
                    ->where('tahun', date('Y'))
                    ->where('type', 'simpanan')
                    ->get()
                    ->count();
            }
        }

        foreach ($hari as $item) {
            for ($i = 0; $i < 7; $i++) {
                $totalSimpananPerhari[] = Transaksi::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                    ->where('hari', $item[$i])
                    ->where('tahun', date('Y'))
                    ->where('type', 'simpanan')
                    ->sum('nominal');
            }
        }

        // total card
        $awalTahunPokok = SimpananPokok::where('tahun', date('Y'))->sum('awal_tahun');
        $anggotaMasukPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_masuk');
        $anggotaKeluarPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        $awalTahunWajib = SimpananWajib::where('tahun', date('Y'))->sum('kekayaan_awal_tahun');
        $wajibSimpanan = SimpananWajib::where('tahun', date('Y'))->sum('simpanan_wajib');
        $anggotaKeluarWajib = SimpananWajib::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalWajib = $awalTahunWajib + $wajibSimpanan - $anggotaKeluarWajib;

        $kas = Kas::where('tahun', date('Y'))
            ->where('name', 'tunai')
            ->first();

        $saldoTunai = Tunai::where('tahun', date('Y'))
            ->orderBy('created_at', 'desc')
            ->first();

        // dd($kas, $saldoTunai);

        if ($kas) {
            $totalKasTunai = $saldoTunai ? $saldoTunai->saldo : $kas->saldo_awal;
        } else {
            $totalKasTunai = null;
        }

        return Inertia::render('Dashboard', [
            'chart' => ['perbulan' => $simpananPokokCount, 'perhari' => $totalSimpananPerhari],
            'cards' => ['simpananPokok' => $totalPokok, 'simpananWajib' => $totalWajib, 'kas_tunai' => $totalKasTunai]
        ]);
    }

    // halaman simpanan pokok
    public function simpananPokok()
    {
        $simpananPokok = SimpananPokok::where('tahun', date('Y'))->orderBy('updated_at', 'desc')->get();

        foreach ($simpananPokok as $data) {
            $datas[] = [
                'name' => $data->member->name,
                'awal_tahun' => $data->awal_tahun === null ? null : $data->awal_tahun,
                'anggota_masuk' => $data->anggota_masuk === null ? null : $data->anggota_masuk,
                'anggota_keluar' => $data->anggota_keluar === null ? null : $data->anggota_keluar,
                'kekayaan' => ($data->awal_tahun === null ? null : $data->awal_tahun) + ($data->anggota_masuk === null ? null : $data->anggota_masuk) - ($data->anggota_keluar === null ? null : $data->anggota_keluar),
            ];
        }

        $awalTahunPokok = SimpananPokok::where('tahun', date('Y'))->sum('awal_tahun');
        $anggotaMasukPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_masuk');
        $anggotaKeluarPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        $members = Member::orderBy('name', 'asc')->get();

        return Inertia::render('Simpanan/Pokok', [
            'data' => isset($datas) ? $datas : $simpananPokok,
            'members' => $members,
            'total' => [
                'awal_tahun' => $awalTahunPokok,
                'anggota_masuk' => $anggotaMasukPokok,
                'anggota_keluar' => $anggotaKeluarPokok,
                'jumlah' => $totalPokok
            ]
        ]);
    }

    // halaman simpanan wajib
    public function simpananWajib()
    {
        $simpananWajib = SimpananWajib::where('tahun', date('Y'))->orderBy('updated_at', 'desc')->get();

        foreach ($simpananWajib as $data) {
            $datas[] = [
                'name' => $data->member->name,
                'kekayaan_awal_tahun' => $data->kekayaan_awal_tahun === null ? null : $data->kekayaan_awal_tahun,
                'simpanan_wajib' => $data->simpanan_wajib === null ? null : $data->simpanan_wajib,
                'anggota_keluar' => $data->anggota_keluar === null ? null : $data->anggota_keluar,
                'kekayaan' => ($data->kekayaan_awal_tahun === null ? null : $data->kekayaan_awal_tahun) + ($data->simpanan_wajib === null ? null : $data->simpanan_wajib) - ($data->anggota_keluar === null ? null : $data->anggota_keluar),
            ];
        }

        $kekayaanAwalTahun = SimpananWajib::where('tahun', date('Y'))->sum('kekayaan_awal_tahun');
        $simpananWajibSum = SimpananWajib::where('tahun', date('Y'))->sum('simpanan_wajib');
        $anggotaKeluar = SimpananWajib::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalWajib = $kekayaanAwalTahun + $simpananWajibSum - $anggotaKeluar;
        $members = Member::orderBy('name', 'asc')->get();

        return Inertia::render('Simpanan/Wajib', [
            'data' => isset($datas) ? $datas : $simpananWajib,
            'members' => $members,
            'total' => [
                'kekayaan_awal_tahun' => $kekayaanAwalTahun,
                'simpanan_wajib' => $simpananWajibSum,
                'anggota_keluar' => $anggotaKeluar,
                'jumlah' => $totalWajib,
            ]
        ]);
    }

    // halaman history
    public function history()
    {
        $history = Transaksi::where('tahun', date('Y'))->orderBy('updated_at', 'desc')->get();

        foreach ($history as $data) {
            $datas[] = [
                'name' => $data->member->name,
                'nominal' => $data->nominal === null ? null : $data->nominal,
                'nominal_keluar' => $data->nominal_keluar === null ? null : $data->nominal_keluar,
                'type' => $data->type === null ? null : $data->type,
                'nama_transaksi' => $data->nama_transaksi === null ? null : $data->nama_transaksi,
                'waktu' => $data->updated_at === null ? null : $data->updated_at,
            ];
        }

        return Inertia::render('admin/History', ['data' => isset($datas) ? $datas : $history]);
    }

    // halaman jumlah admin
    public function admin()
    {
        $data = User::all();

        return Inertia::render('admin/Admin', ['data' => $data]);
    }

    // halaman jasa pituang
    public function jasaPiutang()
    {
        return Inertia::render('admin/JasaPiutang');
    }

    // halaman kas tunai
    public function kasTunai()
    {
        $bulan = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];

        $kas = Kas::where('tahun', date('Y'))
            ->where('name', 'tunai')
            ->first();

        $saldoTunai = Tunai::where('tahun', date('Y'))
            ->orderBy('created_at', 'desc')
            ->first();

        $tunai = Tunai::where('tahun', date('Y'))->get();

        if ($kas) {
            $kas->saldo = $saldoTunai ? $saldoTunai->saldo : $kas->saldo_awal;
    
            $kas->total_masuk = $tunai->sum('masuk');
            $kas->total_keluar = $tunai->sum('keluar');
            $kas->jumlah = $saldoTunai ? $saldoTunai->saldo : null;
        }


        return Inertia::render('admin/Kas/Tunai', [
            'data' => $kas,
            'tunai' => $tunai,
            'bulan' => $bulan
        ]);
    }

    // halaman kas rekening
    public function kasRekening()
    {
        $bulan = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];

        $kas = Kas::where('tahun', date('Y'))
            ->where('name', 'rekening')
            ->first();

        $saldoTunai = Tunai::where('tahun', date('Y'))
            ->orderBy('created_at', 'desc')
            ->first();

        $tunai = Tunai::where('tahun', date('Y'))->get();

        if ($kas) {
            $kas->saldo = $saldoTunai ? $saldoTunai->saldo : $kas->saldo_awal;
    
            $kas->total_masuk = $tunai->sum('masuk');
            $kas->total_keluar = $tunai->sum('keluar');
            $kas->jumlah = $saldoTunai ? $saldoTunai->saldo : null;
        }


        return Inertia::render('admin/Kas/Rekening', [
            'data' => $kas,
            'tunai' => $tunai,
            'bulan' => $bulan
        ]);
    }
}
