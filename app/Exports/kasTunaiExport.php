<?php

namespace App\Exports;

use App\Models\Kas;
use App\Models\Tunai;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class kasTunaiExport implements FromView, ShouldAutoSize
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
            ->where('name', 'tunai')
            ->first();

        $saldoTunai = Tunai::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])
            ->orderBy('created_at', 'desc')
            ->first();

        $tunai = Tunai::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])
            ->get();

        if ($kas) {
            $kas->saldo = $saldoTunai ? $saldoTunai->saldo : $kas->saldo_awal;

            $kas->total_masuk = $tunai->sum('masuk');
            $kas->total_keluar = $tunai->sum('keluar');
            $kas->jumlah = $saldoTunai ? $saldoTunai->saldo : null;
        }

        return view('Exports.Excel.Kas.kasTunai',  [
            'data' => $kas,
            'tunai' => $tunai,
            'years' => $years
        ]);
    }
}
