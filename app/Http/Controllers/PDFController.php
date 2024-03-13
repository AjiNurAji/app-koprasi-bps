<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\AmbilSimpanan;
use App\Models\Kas;
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

    public function ExportKasTunaiPDF()
    {
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

        $pdf = PDF::loadView('Exports.PDF.Kas.kasTunai',  [
            'data' => $kas,
            'tunai' => $tunai,
        ]);

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('kastunai.pdf');
    }

    public function ExportKasRekeningPDF()
    {
        $kas = Kas::where('tahun', date('Y'))
            ->where('name', 'rekening')
            ->first();

        $saldoRekening = TrRekening::orderBy('created_at', 'desc')->first();

        $rekening = Rekening::where('tahun', date('Y'))
            ->orderBy('created_at', 'asc')
            ->get();

        $debet = TrRekening::where('rekening', 'debet')
            ->get();

        $kredit = TrRekening::where('rekening', 'kredit')
            ->get();

        if ($kas) {
            $kas->saldo = $saldoRekening ? $saldoRekening->saldo : $kas->saldo_awal;

            $kas->total_debet = $debet->sum('nominal');
            $kas->total_kredit = $kredit->sum('nominal');
            $kas->jumlah = $saldoRekening ? $saldoRekening->saldo : null;
        }

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

            $datas[] = [
                'bulan' => $value->bulan,
                'setor' => $setor ? $setor->nominal : null,
                'setor_type' => $setor ? $setor->rekening : $saldo->saldo + $saldo->nominal,
                'saldo_setor' => $setor ? $setor->saldo : null,
                'bunga_bank' => $bunga_bank ? $bunga_bank->nominal : null,
                'bunga_bank_type' => $bunga_bank ? $bunga_bank->rekening : null,
                'saldo_bunga_bank' => $bunga_bank ? $bunga_bank->saldo : $saldo->saldo + $saldo->nominal,
                'pajak' => $pajak ? $pajak->nominal : null,
                'pajak_type' => $pajak ? $pajak->rekening : null,
                'saldo_pajak' => $pajak ? $pajak->saldo : $saldo->saldo + $saldo->nominal,
                'adm' => $adm ? $adm->nominal : null,
                'adm_type' => $adm ? $adm->rekening : null,
                'saldo_adm' => $adm ? $adm->saldo : $saldo->saldo + $saldo->nominal,
                'penarikan' => $penarikan ? $penarikan->nominal : null,
                'penarikan_type' => $penarikan ? $penarikan->rekening : null,
                'saldo_penarikan' => $penarikan ? $penarikan->saldo : $saldo->saldo + $saldo->nominal,
            ];
        }

        $pdf = PDF::loadView('Exports.PDF.Kas.kasRekening',   [
            'data' => $kas,
            'rekening' => $datas,
            'datas' => $datas,
        ]);

        $pdf->setOption(['dpi' => 150]);

        $pdf->setPaper('f4', 'potrait');

        return $pdf->download('kasrekening.pdf');
    }
}
