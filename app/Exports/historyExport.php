<?php

namespace App\Exports;

use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class historyExport implements FromView, ShouldAutoSize
{
    use Exportable;

    private $start_date;
    private $end_date;

    public function __construct($start, $end)
    {
        $this->start_date = $start;
        $this->end_date = $end;
    }

    public function view(): View
    {
        $start = $this->start_date;
        $end = $this->end_date;
        $years = date("Y", strtotime($end));

        $history = Transaksi::whereBetween("tanggal_transaksi", [$start, $end])->orderBy("updated_at", "desc")->get();

        foreach ($history as $key => $data) {
            $history[$key]->tanggal = Carbon::createFromTimestamp(strtotime($data->tanggal_transaksi))->locale('in_ID')->isoFormat("LL");
        }

        return view("Exports.Excel.History.history", [
            "data" => $history,
            "years" => $years,
        ]);
    }
}
