<?php

namespace App\Exports;

use App\Models\Kas;
use App\Models\TrTunai;
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
        $years = date("Y", strtotime($this->end_date));
        $start = $this->start_date;
        $end = $this->end_date;

        $kas = Kas::where("tahun", date("Y"))
            ->where("name", "tunai")
            ->first();

        $tunai = Tunai::where("tahun", date("Y"))
            ->orderBy("tanggal_transaksi", "desc")
            ->get();

        foreach ($tunai as $key => $value) {
            $tunai[$key]->masuk = TrTunai::whereBetWeen("tanggal_transaksi", [$start, $end])
                ->where([
                    ["id_tunai", $value->id],
                    ["type", "masuk"]
                ])->get()->sum("nominal");

            $tunai[$key]->keluar = TrTunai::whereBetWeen("tanggal_transaksi", [$start, $end])
                ->where([
                    ["id_tunai", $value->id],
                    ["type", "keluar"]
                ])->get()->sum("nominal");

            $tunai[$key]->saldo = TrTunai::whereBetWeen("tanggal_transaksi", [$start, $end])
                ->where([
                    ["id_tunai", $value->id],
                ])->orderBy("tanggal_transaksi", "desc")->first()->saldo;
        }

        $trTunai = TrTunai::whereBetWeen("tanggal_transaksi", [$start, $end])
            ->orderBy("tanggal_transaksi", "desc")
            ->first();

        $tunaiMasuk = TrTunai::whereBetWeen("tanggal_transaksi", [$start, $end])
            ->where([
                ["type", "masuk"]
            ])->get();

        $tunaiKeluar = TrTunai::whereBetWeen("tanggal_transaksi", [$start, $end])
            ->where([
                ["type", "keluar"]
            ])->get();

        if ($kas) {
            $kas->total_masuk = $tunaiMasuk->sum("nominal");
            $kas->total_keluar = $tunaiKeluar->sum("nominal");
            $kas->jumlah = $trTunai ? $trTunai->saldo : null;
        }

        return view('Exports.Excel.Kas.kasTunai',  [
            'data' => $kas,
            'tunai' => $tunai,
            'years' => $years
        ]);
    }
}
