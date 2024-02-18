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
        } else {
            $datas = [];
        }

        return view('Exports.Excel.Kas.kasRekening',   [
            'data' => $kas,
            'rekening' => $datas,
            'datas' => $datas,
        ]);
    }
}
