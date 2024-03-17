<?php

namespace App\Http\Controllers;

use App\Models\AmbilSimpanan;
use App\Models\BayarPinjaman;
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
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ]
        ];

        $hari = [
            [
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu",
                "Minggu"
            ]
        ];

        // simpanan chart
        foreach ($bulan as $item) {
            for ($i = 0; $i < 12; $i++) {
                $simpananCount[] = Transaksi::whereBetween("tanggal_transaksi", [Carbon::now()->startOfYear()->rawFormat("Y-m-d"), Carbon::now()->endOfYear()->rawFormat("Y-m-d")])
                    ->where("bulan", $item[$i])
                    ->where("type", "simpanan")
                    ->get()
                    ->count();

                $pinjamanCount[] = Transaksi::whereBetween("tanggal_transaksi", [Carbon::now()->startOfYear()->rawFormat("Y-m-d"), Carbon::now()->endOfYear()->rawFormat("Y-m-d")])
                    ->where("bulan", $item[$i])
                    ->where([["type", "pinjaman"], ['nama_transaksi', 'pinjaman']])
                    ->get()
                    ->count();

                $bayarPinjamanCount[] = Transaksi::whereBetween("tanggal_transaksi", [Carbon::now()->startOfYear()->rawFormat("Y-m-d"), Carbon::now()->endOfYear()->rawFormat("Y-m-d")])
                    ->where("bulan", $item[$i])
                    ->where("type", "pinjaman")
                    ->where('nama_transaksi', 'bayar_pinjaman')
                    ->get()
                    ->count();
            }
        }

        foreach ($hari as $item) {
            for ($i = 0; $i < 7; $i++) {
                $totalSimpananPerhari[] = Transaksi::whereBetween("tanggal_transaksi", [Carbon::now()->startOfWeek()->rawFormat("Y-m-d"), Carbon::now()->endOfWeek()->rawFormat("Y-m-d")])
                    ->where("hari", $item[$i])
                    ->where("type", "simpanan")
                    ->sum("nominal");

                $totalBayarPinjamanPerhari[] = Transaksi::whereBetween("tanggal_transaksi", [Carbon::now()->startOfWeek()->rawFormat("Y-m-d"), Carbon::now()->endOfWeek()->rawFormat("Y-m-d")])
                    ->where("hari", $item[$i])
                    ->where("tahun", date("Y"))
                    ->where([["type", "pinjaman"], ['nama_transaksi', 'bayar_pinjaman']])
                    ->sum("nominal");

                $totalPinjamanPerhari[] = Transaksi::whereBetween("tanggal_transaksi", [Carbon::now()->startOfWeek()->rawFormat("Y-m-d"), Carbon::now()->endOfWeek()->rawFormat("Y-m-d")])
                    ->where("hari", $item[$i])
                    ->where("tahun", date("Y"))
                    ->where([["type", "pinjaman"], ['nama_transaksi', 'pinjaman']])
                    ->sum("nominal_keluar");
            }
        }

        // total card
        $awalTahunPokok = SimpananPokok::where("tahun", date("Y"))->sum("awal_tahun");
        $anggotaMasukPokok = SimpananPokok::where("tahun", date("Y"))->sum("anggota_masuk");
        $anggotaKeluarPokok = SimpananPokok::where("tahun", date("Y"))->sum("anggota_keluar");
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        $awalTahunWajib = SimpananWajib::where("tahun", date("Y"))->sum("kekayaan_awal_tahun");
        $wajibSimpanan = SimpananWajib::where("tahun", date("Y"))->sum("simpanan_wajib");
        $anggotaKeluarWajib = AmbilSimpanan::whereBetween("tanggal_ambil", [Carbon::now()->startOfYear()->rawFormat("Y-m-d"), Carbon::now()->endOfYear()->rawFormat("Y-m-d")])->where("simpanan", "wajib")->sum("nominal");
        $totalWajib = $awalTahunWajib + $wajibSimpanan - $anggotaKeluarWajib;

        $totalSukarela = SimpananSukarela::where("tahun", date("Y"))->sum("akhir_taun");

        $kasTunai = Kas::where("tahun", date("Y"))
            ->where("name", "tunai")
            ->first();

        $kasRekening = Kas::where("tahun", date("Y"))
            ->where("name", "rekening")
            ->first();

        $saldoTunai = Tunai::where("tahun", date("Y"))
            ->orderBy("created_at", "desc")
            ->first();

        $saldoRekening = TrRekening::orderBy("created_at", "desc")->first();

        $totalKasTunai = ($saldoTunai ? $saldoTunai->saldo : $kasTunai) ? $kasTunai->saldo_awal : null;
        $totalKasRekening = ($saldoRekening ? $saldoRekening->saldo : $kasRekening) ? $kasRekening->saldo_awal : null;

        return Inertia::render("Dashboard", [
            "chart" => [
                "perbulan" => $simpananCount,
                "perhari" => $totalSimpananPerhari,
                "pinjaman_perbulan" => $pinjamanCount,
                "pinjaman_perhari" => $totalPinjamanPerhari,
                "bayar_pinjaman_perbulan" => $bayarPinjamanCount,
                "bayar_pinjaman_perhari" => $totalBayarPinjamanPerhari,
            ],
            "cards" => [
                "simpananPokok" => $totalPokok,
                "simpananWajib" => $totalWajib,
                "simpananSukarela" => $totalSukarela,
                "kas_tunai" => $totalKasTunai,
                "kas_rekening" => $totalKasRekening
            ]
        ]);
    }

    // halaman simpanan sukarela
    public function simpananSukarela()
    {
        $members = Member::all();

        foreach ($members as $key => $value) {
            $members[$key]["simpanan_sukarela"] = SimpananSukarela::where([
                ["tahun", date("Y")],
                ["id_member", $value["id_member"]]
            ])->get();

            $simpanan = SimpananSukarela::where([
                ["tahun", date("Y")],
                ["id_member", $value["id_member"]]
            ])->orderBy("created_at", "desc")->get()->first();

            $members[$key]["shu"] = $simpanan?->shu;

            $members[$key]["sukarela"] = $simpanan?->sukarela;

            $members[$key]["awal_tahun"] = $simpanan?->awal_tahun;

            $members[$key]["diambil"] = AmbilSimpanan::whereBetween("created_at", [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])
                ->where([
                    ["simpanan", "sukarela"],

                    ["id_member", $value->id_member]
                ])->get()->sum("nominal");

            $members[$key]["akhir_tahun"] = $simpanan?->akhir_taun;
        }

        $totalSelamaTahun = SimpananSukarela::where("tahun", date("Y"))->sum("selama_tahun");
        $totalDiambil = AmbilSimpanan::whereBetween("created_at", [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])->where("simpanan", "sukarela")->get()->sum("nominal");
        $totalDisimpanKembali = SimpananSukarela::where("tahun", date("Y"))->sum("disimpan_kembali");
        return Inertia::render("Simpanan/Sukarela", [
            "data" => $members,
            "total" => [
                "total_selama_tahun" => $totalSelamaTahun,
                "total_diambil" => $totalDiambil,
                "total_disimpan_kembali" => $totalDisimpanKembali,
            ]
        ]);
    }

    // halaman simpanan pokok
    public function simpananPokok()
    {
        $simpananPokok = Member::all();

        foreach ($simpananPokok as $i => $value) {
            $simpananPokok[$i]["awal_tahun"] = SimpananPokok::where([
                ["tahun", date("Y") - 1],
                ["id_member", $value["id_member"]]
            ])->get()->sum("anggota_masuk") - SimpananPokok::where([
                ["tahun", date("Y") - 1],
                ["id_member", $value["id_member"]]
            ])->get()->sum("anggota_keluar");

            $simpananPokok[$i]["simpanan_pokok"] = SimpananPokok::where([
                ["tahun", date("Y")],
                ["id_member", $value["id_member"]]
            ])->get();
        }

        $awalTahunPokok = SimpananPokok::where([
            ["tahun", date("Y") - 1],
        ])->get()->sum("anggota_masuk") - SimpananPokok::where([
            ["tahun", date("Y") - 1],
        ])->get()->sum("anggota_keluar");
        $anggotaMasukPokok = SimpananPokok::where("tahun", date("Y"))->sum("anggota_masuk");
        $anggotaKeluarPokok = SimpananPokok::where("tahun", date("Y"))->sum("anggota_keluar");
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        return Inertia::render("Simpanan/Pokok", [
            "data" => $simpananPokok,
            "total" => [
                "awal_tahun" => $awalTahunPokok,
                "anggota_masuk" => $anggotaMasukPokok,
                "anggota_keluar" => $anggotaKeluarPokok,
                "jumlah" => $totalPokok
            ]
        ]);
    }

    // halaman simpanan wajib
    public function simpananWajib()
    {
        $simpananWajib = Member::all();

        foreach ($simpananWajib as $i => $value) {
            $simpananWajib[$i]["simpanan_wajib"] = SimpananWajib::where([
                ["tahun", date("Y")],
                ["id_member", $value["id_member"]]
            ])->get();

            $simpananWajib[$i]["ambil_simpanan"] = AmbilSimpanan::whereBetween("created_at", [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])->where([
                ["id_member", $value["id_member"]],
                ["simpanan", "wajib"]
            ])->get();

            $simpananWajib[$i]["awal_tahun"] = SimpananWajib::where([
                ["tahun", date("Y") - 1],
                ["id_member", $value["id_member"]]
            ])->get()->sum("simpanan_wajib") - AmbilSimpanan::whereBetween("created_at", [Carbon::createFromDate(date("Y") - 1)->startOfYear(), Carbon::createFromDate(date("Y") - 1)->endOfYear()])
                ->where([
                    ["id_member", $value["id_member"]],
                    ["simpanan", "wajib"]
                ])->get()->sum("nominal");
        }

        $kekayaanAwalTahun = SimpananWajib::where([
            ["tahun", date("Y") - 1],
        ])->get()->sum("simpanan_wajib") - AmbilSimpanan::whereBetween("created_at", [Carbon::createFromDate(date("Y") - 1)->startOfYear(), Carbon::createFromDate(date("Y") - 1)->endOfYear()])
            ->where([
                ["simpanan", "wajib"]
            ])->get()->sum("nominal");
        $simpananWajibSum = SimpananWajib::where("tahun", date("Y"))->sum("simpanan_wajib");
        $anggotaKeluar = AmbilSimpanan::whereBetween("created_at", [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])->where("simpanan", "wajib")->sum("nominal");
        $totalWajib = $kekayaanAwalTahun + $simpananWajibSum - $anggotaKeluar;

        return Inertia::render("Simpanan/Wajib", [
            "data" => $simpananWajib,
            "total" => [
                "kekayaan_awal_tahun" => $kekayaanAwalTahun,
                "simpanan_wajib" => $simpananWajibSum,
                "anggota_keluar" => $anggotaKeluar,
                "jumlah" => $totalWajib,
            ]
        ]);
    }

    // halaman history
    public function history()
    {
        $history = Transaksi::where("tahun", date("Y"))->orderBy("updated_at", "desc")->get();

        foreach ($history as $data) {
            $datas[] = [
                "name" => $data->member->name,
                "nominal" => $data->nominal === null ? null : $data->nominal,
                "nominal_keluar" => $data->nominal_keluar === null ? null : $data->nominal_keluar,
                "type" => $data->type === null ? null : $data->type,
                "nama_transaksi" => $data->nama_transaksi === null ? null : $data->nama_transaksi,
                "waktu" => $data->updated_at === null ? null : $data->updated_at,
            ];
        }

        return Inertia::render("admin/History", ["data" => isset($datas) ? $datas : $history]);
    }

    // halaman jumlah admin
    public function admin()
    {
        $data = User::all();

        return Inertia::render("admin/Admin", ["data" => $data]);
    }

    public function adminCreate()
    {
        return Inertia::render("admin/CreateAdmin");
    }

    // halaman jasa pituang
    public function jasaPiutang()
    {
        $jasa = JasaAnggota::orderBy("created_at", "desc")->get();

        $jasaNow = JasaAnggota::orderBy("created_at", "desc")->first();

        return Inertia::render("admin/JasaPiutang", ["data" => $jasa, "jasaNow" => $jasaNow]);
    }

    public function jasaPiutangCreate()
    {
        return Inertia::render("admin/CreateJasaPiutang");
    }

    // halaman kas tunai
    public function kasTunai()
    {
        $bulan = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        $kas = Kas::where("tahun", date("Y"))
            ->where("name", "tunai")
            ->first();

        $saldoTunai = Tunai::where("tahun", date("Y"))
            ->orderBy("tanggal_transaksi", "desc")
            ->first();

        $tunai = Tunai::where("tahun", date("Y"))->get();

        if ($kas) {
            $kas->saldo = $saldoTunai ? $saldoTunai->saldo : $kas->saldo_awal;

            $kas->total_masuk = $tunai->sum("masuk");
            $kas->total_keluar = $tunai->sum("keluar");
            $kas->jumlah = $saldoTunai ? $saldoTunai->saldo : null;
        }


        return Inertia::render("admin/Kas/Tunai", [
            "data" => $kas,
            "tunai" => $tunai,
            "bulan" => $bulan
        ]);
    }

    // halaman kas rekening
    public function kasRekening()
    {
        $bulan = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        $kas = Kas::where("tahun", date("Y"))
            ->where("name", "rekening")
            ->first();

        $saldoRekening = TrRekening::orderBy("created_at", "desc")->first();


        $rekening = Rekening::where("tahun", date("Y"))
            ->orderBy("created_at", "asc")
            ->get();

        if ($kas) {
            $kas->saldo = $saldoRekening ? $saldoRekening->saldo : $kas->saldo_awal;
        }

        foreach ($rekening as $i => $value) {
            $setor = TrRekening::where("id_rekening", $value->id_rekening)
                ->where("type", "setor")
                ->first();

            $bungaBank = TrRekening::where("id_rekening", $value->id_rekening)
                ->where("type", "bunga_bank")
                ->first();

            $pajak = TrRekening::where("id_rekening", $value->id_rekening)
                ->where("type", "pajak")
                ->first();

            $adm = TrRekening::where("id_rekening", $value->id_rekening)
                ->where("type", "adm")
                ->first();

            $penarikan = TrRekening::where("id_rekening", $value->id_rekening)
                ->where("type", "penarikan")
                ->first();

            $rekening[$i]->setor = $setor?->nominal;
            $rekening[$i]->setor_type = $setor?->rekening;

            $rekening[$i]->bunga_bank = $bungaBank?->nominal;
            $rekening[$i]->bunga_bank_type = $bungaBank?->rekening;

            $rekening[$i]->pajak = $pajak?->nominal;
            $rekening[$i]->pajak_type = $pajak?->rekening;

            $rekening[$i]->adm = $adm?->nominal;
            $rekening[$i]->adm_type = $adm?->rekening;

            $rekening[$i]->penarikan = $penarikan?->nominal;
            $rekening[$i]->penarikan_type = $penarikan?->rekening;

            $rekening[$i]->saldo = TrRekening::where("id_rekening", $value->id_rekening)
                ->orderBy("created_at", "desc")
                ->first()->saldo;
        }


        return Inertia::render("admin/Kas/Rekening", [
            "data" => $kas,
            "rekening" => $rekening,
            "bulan" => $bulan
        ]);
    }

    // halaman pinjaman
    public function pinjamanAnggota()
    {
        $data = Member::all();

        foreach ($data as $i => $v) {
            $data[$i]["pinjaman"] = Pinjaman::where("id_member", $v["id_member"])->get();

            $data[$i]["pinjaman"]["bayar"] = BayarPinjaman::where("id_member", $v["id_member"])->get();

            $pinjaman = Pinjaman::where("id_member", $v["id_member"])
                ->where("tahun", (date("Y") - 1))
                ->orderBy("created_at", "desc")
                ->get()
                ->first();

            $pinjamanNow = Pinjaman::where([
                ["id_member", $v["id_member"]],
                ["tahun", date("Y")]
            ])->orderBy("created_at", "desc")->get();

            $bayar = BayarPinjaman::where([
                ["id_member", $v["id_member"]],
                ["tahun", date("Y")]
            ])->get();

            $bayarTahunLalu = BayarPinjaman::where([
                ["id_member", $v["id_member"]],
                ["tahun", date("Y") - 1]
            ])->orderBy("created_at", "desc")->get()->first();

            $data[$i]["pinjaman"]["tahun_lalu"] = $bayarTahunLalu ? $bayarTahunLalu->sisa : ($pinjaman ? $pinjaman->sisa : 0);

            $data[$i]["pinjaman"]["total_pinjaman"] = $pinjamanNow ? $pinjamanNow->sum("nominal") : 0;
            $data[$i]["pinjaman"]["sisa_pinjaman"] = !$pinjamanNow ? ($bayarTahunLalu ? $bayarTahunLalu->sisa : ($pinjaman ? $pinjaman->sisa : 0)) : ($pinjamanNow ? ($bayarTahunLalu ? $bayarTahunLalu->sisa : ($pinjaman ? $pinjaman->sisa : 0)) + $pinjamanNow->sum("nominal") - ($bayar ? $bayar->sum("nominal") : 0) : 0);
            $data[$i]["pinjaman"]["dibayar"] = $bayar ? $bayar->sum("nominal") : 0;
        }

        $bayarTahunLalu = BayarPinjaman::whereBetween("tanggal_bayar", [Carbon::createFromDate(date('Y') - 1)->startOfYear()->rawFormat("Y-m-d"), Carbon::createFromDate(date('Y') - 1)->endOfYear()->rawFormat("Y-m-d")])->orderBy("created_at", "desc")->get()->first();
        $pinjamanTahunLalu = Pinjaman::whereBetween("tanggal_pinjam", [Carbon::createFromDate(date('Y') - 1)->startOfYear()->rawFormat("Y-m-d"), Carbon::createFromDate(date('Y') - 1)->endOfYear()->rawFormat("Y-m-d")])->orderBy("created_at", "desc")->get()->first();

        $tahunLalu = $bayarTahunLalu ? $bayarTahunLalu->sisa : ($pinjamanTahunLalu ? $pinjamanTahunLalu->sisa : 0);
        $pinjaman = Pinjaman::where("tahun", date("Y"))->get()->sum("nominal");
        $terbayar = BayarPinjaman::where("tahun", date("Y"))->get()->sum("nominal");
        $sisa = $tahunLalu + $pinjaman - $terbayar;

        return Inertia::render("admin/Pinjaman/Pinjaman", [
            "data" => $data,
            "cards" => [
                "total_pinjaman" => $pinjaman,
                "total_dibayar" => $terbayar,
                "sisa_pinjaman_tahun_lalu" => $tahunLalu,
                "sisa" => $sisa
            ]
        ]);
    }

    public function pinjaman()
    {
        $member = Member::all();

        $start = Carbon::now()->startOfYear()->rawFormat("Y-m-d");
        $end = Carbon::now()->endOfYear()->rawFormat("Y-m-d");

        $years = date('Y', strtotime($end));

        $start_tahun_lalu = Carbon::createFromDate(date('Y', strtotime($start)) - 1)->startOfYear()->rawFormat("Y-m-d");
        $end_tahun_lalu = Carbon::createFromDate(date('Y', strtotime($end)) - 1)->endOfYear()->rawFormat("Y-m-d");

        foreach ($member as $key => $value) {
            // pinjaman baru
            $pinjaman = Pinjaman::whereBetween('tanggal_pinjam', [$start, $end])
                ->where("id_member", $value->id_member)->get();

            // bayar pinjaman
            $bayarCicilan = BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                ->where([
                    ["id_member", $value->id_member],
                    ["jenis", "cicilan"]
                ])
                ->orderBy("created_at", "desc")
                ->get();

            $bayarLangsung = BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                ->where([
                    ["id_member", $value->id_member],
                    ["jenis", "langsung"]
                ])
                ->orderBy("created_at", "desc")
                ->get();

            // pinjaman tahun lalu
            $pinjamanTahunLalu = Pinjaman::whereBetween('tanggal_pinjam', [
                $start_tahun_lalu,
                $end_tahun_lalu
            ])->where("id_member", $value->id_member)->orderBy("created_at", "desc")
                ->get()->first();

            // bayar pinjaman tahun lalu
            $bayarTahunLalu = BayarPinjaman::whereBetween('tanggal_bayar', [
                $start_tahun_lalu,
                $end_tahun_lalu
            ])->where("id_member", $value->id_member)
                ->orderBy("created_at", "desc")
                ->get()->first();

            $member[$key]->pinjaman = $pinjaman?->sum('nominal');
            $member[$key]['bayar']['cicilan'] = $bayarCicilan;
            $member[$key]['bayar']['langsung'] = $bayarLangsung;
            $member[$key]->pinjaman_tahun_lalu = $pinjamanTahunLalu?->nominal;
            $member[$key]->sisa = $bayarTahunLalu ? $bayarTahunLalu->sisa - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0)) : (
                $pinjamanTahunLalu
                ?
                $pinjamanTahunLalu->sisa - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0))
                :
                $pinjaman->sum('nominal') - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0))
            );
        }

        return view("Exports.Excel.Pinjaman.pinjamanAnggota", [
            "years" => $years,
            "data" => $member,
            "total" => [
                "cicilan" => BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                    ->where("jenis", "cicilan")
                    ->get(),

                "langsung" => BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                    ->where("jenis", "langsung")
                    ->get(),
            ]
        ]);
    }

    // view pinjaman
    public function viewPinjaman(string $id)
    {
        $member = Member::with(["pinjaman", "pinjaman.bayar"])->findOrFail($id);

        $tahunLalu = Pinjaman::where([
            ["id_member", $member->id_member],
            ["tahun", date("Y") - 1]
        ])
            ->orderBy("created_at", "desc")
            ->get()
            ->first();

        $terbayar = BayarPinjaman::where([
            ["tahun", date("Y")],
            ["id_member", $member->id_member]
        ])->get();

        $member->tahun_lalu = $tahunLalu ? $tahunLalu->sisa : 0;
        $member->bayar = $terbayar;
        $member->total_terbayar = $terbayar->sum("nominal");
        $member->total = Pinjaman::where([
            ["tahun", date("Y")],
            ["id_member", $member->id_member]
        ])
            ->get()
            ->sum("nominal");

        $member->sisa = $member->total - $member->total_terbayar;

        return Inertia::render("admin/Pinjaman/PinjamanMember", ["pinjaman" => $member]);
    }

    // transaction page
    public function pinjamanTransaction()
    {
        return Inertia::render("Pinjaman/Transaction");
    }

    public function pokokTransaksi()
    {
        return Inertia::render("Simpanan/Transaction/Pokok");
    }

    public function wajibTransaksi()
    {
        return Inertia::render("Simpanan/Transaction/Wajib");
    }

    public function sukarelaTransaksi()
    {
        return Inertia::render("Simpanan/Transaction/Sukarela");
    }

    public function createKasRekening()
    {
        $bulan = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        $kas = Kas::where('tahun', date('Y'))
            ->where('name', 'rekening')
            ->first();

        return Inertia::render("admin/Kas/Create/Rekening", [
            "bulan" => $bulan,
            "saldo" => $kas,
        ]);
    }

    public function createKasTunai()
    {
        $bulan = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        $kas = Kas::where("tahun", date("Y"))
            ->where("name", "tunai")
            ->first();

        return Inertia::render("admin/Kas/Create/Tunai", ['bulan' => $bulan, 'saldo' => $kas]);
    }

    public function setSaldoAwal(string $param)
    {
        $postUrl = route("set_saldo_awal");
        $directUrl = $param === "rekening" ? route("kas_rekening") : route("kas_tunai");

        $checking = Kas::where([
            ["name", $param],
            ["tahun", date("Y")]
        ])->get()->first();

        if ($checking) return Inertia::render("admin/Kas/SaldoAwal", [
            "message" => "Saldo awal tahun " . date('Y') . " sudah di set!",
            "directUrl" => $directUrl,
        ]);

        return Inertia::render("admin/Kas/SaldoAwal", [
            "name" => $param,
            "postUrl" => $postUrl,
            "directUrl" => $directUrl,
        ]);
    }

    // halaman ad-art
    public function adART()
    {
        return Inertia::render("AdART");
    }
}
