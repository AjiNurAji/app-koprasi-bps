<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\SimpananPokok;
use App\Models\JasaAnggota;
use App\Models\SimpananWajib;
use App\Models\Pinjaman;
use App\Models\Member;
use App\Models\Rekening;
use App\Models\SimpananSukarela;
use App\Models\Transaksi;
use App\Models\TrRekening;
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

        $totalSukarela = SimpananSukarela::where('tahun', date('Y'))->sum('akhir_taun');

        $kasTunai = Kas::where('tahun', date('Y'))
            ->where('name', 'tunai')
            ->first();

        $kasRekening = Kas::where('tahun', date('Y'))
            ->where('name', 'rekening')
            ->first();

        $saldoTunai = Tunai::where('tahun', date('Y'))
            ->orderBy('created_at', 'desc')
            ->first();

        $saldoRekening = TrRekening::orderBy('created_at', 'desc')->first();

        // dd($kas, $saldoTunai);

        if ($kasTunai || $kasRekening) {
            $totalKasTunai = ($saldoTunai ? $saldoTunai->saldo : $kasTunai) ? $kasTunai->saldo_awal : null;
            $totalKasRekening = ($saldoRekening ? $saldoRekening->saldo : $kasRekening) ? $kasRekening->saldo_awal : null;
        }

        return Inertia::render('Dashboard', [
            'chart' => [
                'perbulan' => $simpananPokokCount,
                'perhari' => $totalSimpananPerhari
            ],
            'cards' => [
                'simpananPokok' => $totalPokok,
                'simpananWajib' => $totalWajib,
                'simpananSukarela' => $totalSukarela,
                'kas_tunai' => $totalKasTunai,
                'kas_rekening' => $totalKasRekening
            ]
        ]);
    }

    // halaman simpanan sukarela
    public function simpananSukarela()
    {
        $simpananSukarela = SimpananSukarela::with(['member'])
            ->where('tahun', date('Y'))
            ->orderBy('updated_at', 'desc')
            ->get()->toArray();

        $totalSukarelaPembulatan = simpananSukarela::where('tahun', date('Y'))->sum('sukarela');
        $totalShu = simpananSukarela::where('tahun', date('Y'))->sum('shu');
        $totalAwalTahun = simpananSukarela::where('tahun', date('Y'))->sum('awal_tahun');
        $totalSelamaTahun = simpananSukarela::where('tahun', date('Y'))->sum('selama_tahun');
        $totalDiambil = simpananSukarela::where('tahun', date('Y'))->sum('diambil');
        $totalDisimpanKembali = simpananSukarela::where('tahun', date('Y'))->sum('disimpan_kembali');
        $totalAkhirTahun = simpananSukarela::where('tahun', date('Y'))->sum('akhir_taun');

        $members = Member::orderBy('name', 'asc')->get();

        return Inertia::render('Simpanan/Sukarela', [
            'data' => $simpananSukarela,
            'members' => $members,
            'total' => [
                'total_sukarela' => $totalSukarelaPembulatan,
                'total_shu' => $totalShu,
                'total_awal_tahun' => $totalAwalTahun,
                'total_selama_tahun' => $totalSelamaTahun,
                'total_diambil' => $totalDiambil,
                'total_disimpan_kembali' => $totalDisimpanKembali,
                'total_akhir_tahun' => $totalAkhirTahun
            ]
        ]);
    }

    // halaman simpanan pokok
    public function simpananPokok()
    {
        $simpananPokok = SimpananPokok::with(['member'])
            ->where('tahun', date('Y'))
            ->orderBy('updated_at', 'desc')
            ->get()->toArray();

        $awalTahunPokok = SimpananPokok::where('tahun', date('Y'))->sum('awal_tahun');
        $anggotaMasukPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_masuk');
        $anggotaKeluarPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        $members = Member::orderBy('name', 'asc')->get();

        return Inertia::render('Simpanan/Pokok', [
            'data' => $simpananPokok,
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
        $simpananWajib = SimpananWajib::with(['member'])
            ->where('tahun', date('Y'))
            ->orderBy('updated_at', 'desc')
            ->get()->toArray();

        $taunKemarin = SimpananWajib::with(['member'])
            ->where('tahun', (date('Y') - 1))
            ->orderBy('updated_at', 'desc')
            ->get()->toArray();

        foreach ($taunKemarin as $i => $cols) {
            $simpananWajib[$i]['totalTahun'] = $cols['kekayaan_awal_tahun'] + $cols['simpanan_wajib'] - $cols['anggota_keluar'];
        }

        $kekayaanAwalTahun = SimpananWajib::where('tahun', date('Y'))->sum('kekayaan_awal_tahun');
        $simpananWajibSum = SimpananWajib::where('tahun', date('Y'))->sum('simpanan_wajib');
        $anggotaKeluar = SimpananWajib::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalWajib = $kekayaanAwalTahun + $simpananWajibSum - $anggotaKeluar;
        $members = Member::orderBy('name', 'asc')->get();

        return Inertia::render('Simpanan/Wajib', [
            'data' => $simpananWajib,
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
        $jasa = JasaAnggota::orderBy('created_at', 'desc')->get();

        $jasaNow = JasaAnggota::orderBy('created_at', 'desc')->first();

        return Inertia::render('admin/JasaPiutang', ['data' => $jasa, 'jasaNow' => $jasaNow]);
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

        $saldoRekening = TrRekening::orderBy('created_at', 'desc')->first();


        $rekening = Rekening::where('tahun', date('Y'))
            ->orderBy('created_at', 'asc')
            ->get();

        if ($kas) {
            $kas->saldo = $saldoRekening ? $saldoRekening->saldo : $kas->saldo_awal;
        }

        if ($rekening) {
            foreach ($rekening as $i => $value) {
                $setor = TrRekening::where('id_rekening', $value->id_rekening)
                    ->where('type', 'setor')
                    ->first();

                $bunga_bank = TrRekening::where('id_rekening', $value->id_rekening)
                    ->where('type', 'bunga_bank')
                    ->first();

                $pajak = TrRekening::where('id_rekening', $value->id_rekening)
                    ->where('type', 'pajak')
                    ->first();

                $adm = TrRekening::where('id_rekening', $value->id_rekening)
                    ->where('type', 'adm')
                    ->first();

                $penarikan = TrRekening::where('id_rekening', $value->id_rekening)
                    ->where('type', 'penarikan')
                    ->first();

                $saldo = TrRekening::where('id_rekening', $value->id_rekening)
                    ->orderBy('created_at', 'desc')
                    ->first();

                // dd($setor);
                $datas[] = [
                    'bulan' => $value->bulan,
                    'setor' => $setor ? $setor->nominal : null,
                    'setor_type' => $setor ? $setor->rekening : null,
                    'bunga_bank' => $bunga_bank ? $bunga_bank->nominal : null,
                    'bunga_bank_type' => $bunga_bank ? $bunga_bank->rekening : null,
                    'pajak' => $pajak ? $pajak->nominal : null,
                    'pajak_type' => $pajak ? $pajak->rekening : null,
                    'adm' => $adm ? $adm->nominal : null,
                    'adm_type' => $adm ? $adm->rekening : null,
                    'penarikan' => $penarikan ? $penarikan->nominal : null,
                    'penarikan_type' => $penarikan ? $penarikan->rekening : null,
                    'saldo' => $saldo ? $saldo->saldo : null
                ];
            }
        } else {
            $datas = [];
        }


        return Inertia::render('admin/Kas/Rekening', [
            'data' => $kas,
            'rekening' => $datas,
            'datas' => $datas,
            'bulan' => $bulan
        ]);
    }

    // halaman pinjaman
    public function pinjamanAnggota()
    {
        $data = Member::with(['pinjaman', 'pinjaman.bayar'])->get()->toArray();

        foreach ($data as $i => $v) {
            $pinjaman = Pinjaman::where('id_member', $v['id_member'])
                ->where('tahun', (date('Y') - 1))
                ->first();

            $pinjamanNow = Pinjaman::where('id_member', $v['id_member'])
                ->where('tahun', date('Y'))
                ->get();

            $data[$i]['pinjaman']['tahun_lalu'] = $pinjaman ? $pinjaman->sisa : $pinjaman;

            $data[$i]['pinjaman']['total_pinjaman'] = $pinjaman ? $pinjaman->sisa + $pinjamanNow->sum('nominal') : $pinjamanNow->sum('nominal');
            $data[$i]['pinjaman']['sisa_pinjaman'] = $pinjamanNow->sum('nominal');
        }

        $pinjaman = Pinjaman::where('tahun', date('Y'))->get()->sum('nominal');

        $member = Member::orderBy('name', 'asc')->get();

        return Inertia::render('admin/Pinjaman/Pinjaman', [
            'data' => $data, 
            'members' => $member,
            'cards' => [
                'total_pinjaman' => $pinjaman,
                'total_dibayar' => null,
            ]
        ]);
    }

    // halaman ad-art
    public function adART()
    {
        return Inertia::render('AdART');
    }
}
