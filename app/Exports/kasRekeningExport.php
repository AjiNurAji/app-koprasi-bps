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

    private $start_date;
    private $end_date;

    public function __construct($startDate, $endDate)
    {
        $this->start_date = $startDate;
        $this->end_date = $endDate;
    }

    public function view(): View
    {

        $years = date('Y', strtotime($this->end_date));

        $kas = Kas::where('tahun', $years)
            ->where('name', 'rekening')
            ->first();

        $saldoRekening = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->orderBy('created_at', 'desc')->first();

        $rekening = Rekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])
            ->orderBy('tanggal_transaksi', 'asc')
            ->get();

        $debet = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('rekening', 'debet')
            ->get();

        $kredit = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('rekening', 'kredit')
            ->get();

        if ($kas) {
            $kas->saldo = $saldoRekening ? $saldoRekening->saldo : $kas->saldo_awal;

            $kas->total_debet = $debet->sum('nominal');
            $kas->total_kredit = $kredit->sum('nominal');
            $kas->jumlah = $saldoRekening ? $saldoRekening->saldo : null;
        }

        if ($rekening) {
            foreach ($rekening as $i => $value) {
                $setor = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'setor')
                    ->first();

                $bungaBank = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'bunga_bank')
                    ->first();

                $pajak = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'pajak')
                    ->first();

                $adm = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('id_rekening', $value->id_rekening)
                    ->where('type', 'adm')
                    ->first();

                $penarikan = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('id_rekening', $value->id_rekening)
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

                $rekening[$i]->saldo = TrRekening::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('id_rekening', $value->id_rekening)
                    ->orderBy('created_at', 'desc')
                    ->first()->saldo;
            }
        }

        return view('Exports.Excel.Kas.kasRekening',   [
            'data' => $kas,
            'datas' => $rekening,
            'years' => $years
        ]);
    }
}
