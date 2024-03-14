<?php

namespace App\Exports;

use App\Models\Kas;
use App\Models\Rekening;
use App\Models\TrRekening;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class kasRekeningExport implements FromView, ShouldAutoSize
{
    use Exportable;

    public function view(): View
    {
        $kas = Kas::where('tahun', date('Y'))
            ->where('name', 'rekening')
            ->first();

        $saldoRekening = TrRekening::orderBy('tanggal_transaksi', 'desc')->first();

        $rekening = Rekening::where('tahun', date('Y'))
            ->orderBy('tanggal_transaksi', 'asc')
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

        if ($rekening) {
            foreach ($rekening as $i => $value) {
                $setor = TrRekening::where('id_rekening', $value->id_rekening)
            ->where('type', 'setor')
            ->first();

            $bungaBank = TrRekening::where('id_rekening', $value->id_rekening)
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

            $rekening[$i]->saldo = TrRekening::where('id_rekening', $value->id_rekening)
                ->orderBy('tanggal_transaksi', 'desc')
                ->first()->saldo;
            }
        }

        return view('Exports.Excel.Kas.kasRekening',   [
            'data' => $kas,
            'datas' => $rekening,
        ]);
    }
}
