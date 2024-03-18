<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\AmbilSimpanan;
use App\Models\BayarPinjaman;
use App\Models\Kas;
use App\Models\Pinjaman;
use App\Models\Rekening;
use App\Models\SimpananPokok;
use App\Models\SimpananSukarela;
use App\Models\SimpananWajib;
use App\Models\TrRekening;
use App\Models\Tunai;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PDF;

class PDFController extends Controller
{
    public function ExportSimpananPokokPDF(Request $request)
    {
        $members = Member::all();
        $years = date('Y', strtotime($request->input('end_date')));

        foreach ($members as $key => $value) {
            $members[$key]->simpanan_pokok = SimpananPokok::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('id_member', $value->id_member)->get();
            $members[$key]->awal_tahun = SimpananPokok::where([['id_member', $value->id_member], ['tahun', $years - 1]])->get()->sum('anggota_masuk') - SimpananPokok::where([['id_member', $value->id_member], ['tahun', $years - 1]])->get()->sum('anggota_keluar');
        }

        $awalTahunPokok = SimpananPokok::where('tahun', $years - 1)->get()->sum('anggota_masuk') - SimpananPokok::where('tahun', $years - 1)->get()->sum('anggota_keluar');
        $anggotaMasukPokok = SimpananPokok::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->get()->sum('anggota_masuk');
        $anggotaKeluarPokok = SimpananPokok::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->get()->sum('anggota_keluar');
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        $pdf = PDF::loadView('Exports.PDF.Simpanan.simpananPokok', [
            'data' => $members,
            'years' => $years,
            'total' => [
                'awal_tahun' => $awalTahunPokok,
                'anggota_masuk' => $anggotaMasukPokok,
                'anggota_keluar' => $anggotaKeluarPokok,
                'jumlah' => $totalPokok
            ]
        ]);

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('simpananpokok.pdf');
    }

    public function ExportSimpananWajibPDF(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        $members = Member::all();

        foreach ($members as $key => $value) {
            $members[$key]->simpanan_wajib = SimpananWajib::whereBetween('created_at', [$request->input('start_date'), $request->input('end_date')])->where('id_member', $value->id_member)->get();
            $members[$key]->ambil_simpanan_wajib = AmbilSimpanan::whereBetween('tanggal_ambil', [$request->input('start_date'), $request->input('end_date')])->where([['simpanan', 'wajib'], ['id_member', $value->id_member]])->get();
        }

        $years = date('Y', strtotime($request->input('end_date')));

        $totals = SimpananWajib::whereBetween('created_at', [$request->input('start_date'), $request->input('end_date')])->get();
        $ambil = AmbilSimpanan::whereBetween('tanggal_ambil', [$request->input('start_date'), $request->input('end_date')])->where('simpanan', 'wajib')->get();

        $pdf = PDF::loadView('Exports.PDF.Simpanan.simpananWajib', [
            'data' => $members,
            'years' => $years,
            'totals' => $totals,
            'totalsAmbil' => $ambil,
        ]);

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('simpananwajib.pdf');
    }

    public function ExportSimpananSukarelaPDF(Request $request)
    {

        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        $members = Member::all();
        $years = date('Y', strtotime($request->input('end_date')));

        $start = Carbon::createFromDate(date('Y', strtotime($request->input('start_date'))), date('m', strtotime($request->input('start_date'))), date('d', strtotime($request->input('start_date'))))->startOfDay();
        $end = Carbon::createFromDate(date('Y', strtotime($request->input('end_date'))), date('m', strtotime($request->input('end_date'))), date('d', strtotime($request->input('end_date'))))->endOfDay();

        foreach ($members as $key => $value) {
            $members[$key]->simpanan_sukarela = SimpananSukarela::whereBetween('created_at', [$start, $end])->where('id_member', $value->id_member)->get();

            $simpanan = SimpananSukarela::whereBetween('created_at', [$start, $end])->where('id_member', $value->id_member)->orderBy('created_at', 'desc')->get()->first();

            $members[$key]->shu = $simpanan?->shu;

            $members[$key]->sukarela = $simpanan?->sukarela;

            $members[$key]->awal_tahun = $simpanan?->awal_tahun;

            $members[$key]->diambil = AmbilSimpanan::whereBetween('created_at', [$start, $end])
                ->where([
                    ['simpanan', 'sukarela'],
                    ['id_member', $value->id_member]
                ])->get()->sum('nominal');

            $members[$key]->akhir_tahun = $simpanan?->akhir_taun;
        }

        $totalSelamaTahun = SimpananSukarela::whereBetween('created_at', [$start, $end])->get()->sum('selama_tahun');
        $totalDiambil = AmbilSimpanan::whereBetween('created_at', [$start, $end])->where('simpanan', 'sukarela')->get()->sum('nominal');
        $totalDisimpanKembali = SimpananSukarela::whereBetween('created_at', [$start, $end])->get()->sum('disimpan_kembali');

        $pdf = PDF::loadView('Exports.PDF.Simpanan.simpananSukarela', [
            'data' => $members,
            'years' => $years,
            'total' => [
                'total_selama_tahun' => $totalSelamaTahun,
                'total_diambil' => $totalDiambil,
                'total_disimpan_kembali' => $totalDisimpanKembali,
            ]
        ]);

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('simpanansukarela.pdf');
    }

    public function ExportKasTunaiPDF(Request $request)
    {
        $years = date('Y', strtotime($request->input('end_date')));

        $kas = Kas::where('tahun', $years)
            ->where('name', 'tunai')
            ->first();

        $saldoTunai = Tunai::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])
            ->orderBy('created_at', 'desc')
            ->first();

        $tunai = Tunai::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])
            ->get();

        if ($kas) {
            $kas->saldo = $saldoTunai ? $saldoTunai->saldo : $kas->saldo_awal;

            $kas->total_masuk = $tunai->sum('masuk');
            $kas->total_keluar = $tunai->sum('keluar');
            $kas->jumlah = $saldoTunai ? $saldoTunai->saldo : null;
        }

        $pdf = PDF::loadView('Exports.PDF.Kas.kasTunai',  [
            'data' => $kas,
            'tunai' => $tunai,
            'years' => $years
        ]);

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('kastunai.pdf');
    }

    public function ExportKasRekeningPDF(Request $request)
    {
        $years = date('Y', strtotime($request->input('end_date')));

        $kas = Kas::where('tahun', $years)
            ->where('name', 'rekening')
            ->first();

        $saldoRekening = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->orderBy('created_at', 'desc')->first();

        $rekening = Rekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])
            ->orderBy('tanggal_transaksi', 'asc')
            ->get();

        $debet = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('rekening', 'debet')
            ->get();

        $kredit = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('rekening', 'kredit')
            ->get();

        if ($kas) {
            $kas->saldo = $saldoRekening ? $saldoRekening->saldo : $kas->saldo_awal;

            $kas->total_debet = $debet->sum('nominal');
            $kas->total_kredit = $kredit->sum('nominal');
            $kas->jumlah = $saldoRekening ? $saldoRekening->saldo : null;
        }

        if ($rekening) {
            foreach ($rekening as $i => $value) {
                $setor = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'setor')
                    ->first();

                $bungaBank = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'bunga_bank')
                    ->first();

                $pajak = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'pajak')
                    ->first();

                $adm = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'adm')
                    ->first();

                $penarikan = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'penarikan')
                    ->first();

                $rekening[$i]->setor = $setor?->nominal;
                $rekening[$i]->setor_type = $setor?->rekening;
                $rekening[$i]->saldo_setor = $setor ? $setor->saldo : $kas->saldo_awal;

                $rekening[$i]->bunga_bank = $bungaBank?->nominal;
                $rekening[$i]->bunga_bank_type = $bungaBank?->rekening;
                $rekening[$i]->saldo_bunga_bank = $bungaBank ? $bungaBank->saldo : ($setor ? $setor->saldo : $kas->saldo_awal);

                $rekening[$i]->pajak = $pajak?->nominal;
                $rekening[$i]->pajak_type = $pajak?->rekening;
                $rekening[$i]->saldo_pajak = $pajak ? $pajak->saldo : ($bungaBank ? $bungaBank->saldo : ($setor ? $setor->saldo : $kas->saldo_awal));

                $rekening[$i]->adm = $adm?->nominal;
                $rekening[$i]->adm_type = $adm?->rekening;
                $rekening[$i]->saldo_adm = $adm ? $adm->saldo : ($pajak ? $pajak->saldo : ($setor ? $setor->saldo : $kas->saldo_awal));

                $rekening[$i]->penarikan = $penarikan?->nominal;
                $rekening[$i]->penarikan_type = $penarikan?->rekening;
                $rekening[$i]->saldo_penarikan = $penarikan ? $penarikan->saldo : ($adm ? $adm->saldo : ($setor ? $setor->saldo : $kas->saldo_awal));

                $rekening[$i]->saldo = TrRekening::whereBetween('tanggal_transaksi', [$request->input('start_date'), $request->input('end_date')])->where('id_rekening', $value->id_rekening)
                    ->orderBy('tanggal_transaksi', 'desc')
                    ->first()->saldo;
            }
        }

        $pdf = PDF::loadView('Exports.PDF.Kas.kasRekening',   [
            'data' => $kas,
            'datas' => $rekening,
            'years' => $years
        ]);

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('kasrekening.pdf');
    }

    public function PinjamanPDF(Request $request)
    {
        $member = Member::all();

        $start = $request->input("start_date");
        $end = $request->input("end_date");

        $years = date('Y', strtotime($request->input("end_date")));

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
                ->get();

            $bayarLangsung = BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                ->where([
                    ["id_member", $value->id_member],
                    ["jenis", "langsung"]
                ])
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
            $member[$key]->bayar['cicilan'] = $bayarCicilan;
            $member[$key]->bayar['langsung'] = $bayarLangsung;
            $member[$key]->pinjaman_tahun_lalu = $pinjamanTahunLalu?->nominal;
            $member[$key]->sisa = $bayarTahunLalu ? $bayarTahunLalu->sisa - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0)) : (
                $pinjamanTahunLalu
                ?
                $pinjamanTahunLalu->sisa - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0))
                :
                $pinjaman->sum('nominal') - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0))
            );
        }

        $pdf = PDF::loadView('Exports.PDF.Pinjaman.pinjamanAnggota',   [
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

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('pinjamananggota.pdf');
    }
}
