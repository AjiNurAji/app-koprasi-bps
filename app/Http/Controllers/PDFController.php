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

    public function ExportSimpananSukarelaPDF()
    {
        $simpananSukarela = SimpananSukarela::where('tahun', date('Y'))->orderBy('updated_at', 'asc')->get();

        foreach ($simpananSukarela as $data) {
            $datas[] = [
                'name' => $data->member->name,
                'sukarela' => $data->sukarela === null ? null : $data->sukarela,
                'selama_tahun' => $data->selama_tahun === null ? null : $data->selama_tahun,
                'awal_tahun' => $data->awal_tahun === null ? null : $data->awal_tahun,
                'shu' => $data->shu === null ? null : $data->shu,
                'diambil' => $data->diambil === null ? null : $data->diambil,
                'disimpan_kembali' => $data->disimpan_kembali === null ? null : $data->disimpan_kembali,
                'akhir_taun' => $data->akhir_taun === null ? null : $data->akhir_taun,
            ];
        }

        $totalSukarelaPembulatan = simpananSukarela::where('tahun', date('Y'))->sum('sukarela');
        $totalShu = simpananSukarela::where('tahun', date('Y'))->sum('shu');
        $totalAwalTahun = simpananSukarela::where('tahun', date('Y'))->sum('awal_tahun');
        $totalSelamaTahun = simpananSukarela::where('tahun', date('Y'))->sum('selama_tahun');
        $totalDiambil = simpananSukarela::where('tahun', date('Y'))->sum('diambil');
        $totalDisimpanKembali = simpananSukarela::where('tahun', date('Y'))->sum('disimpan_kembali');
        $totalAkhirTahun = simpananSukarela::where('tahun', date('Y'))->sum('akhir_taun');

        $pdf = PDF::loadView('Exports.PDF.Simpanan.simpananSukarela', [
            'data' => isset($datas) ? $datas : $simpananSukarela,
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
