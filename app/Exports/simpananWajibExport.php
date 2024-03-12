<?php

namespace App\Exports;

use App\Models\AmbilSimpanan;
use App\Models\Member;
use App\Models\SimpananWajib;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class simpananWajibExport implements FromView, ShouldAutoSize
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
        $members = Member::all();

        foreach ($members as $key => $value) {
            $members[$key]->simpanan_wajib = SimpananWajib::whereBetween('created_at', [$this->start_date, $this->end_date])->where('id_member', $value->id_member)->get();
            $members[$key]->ambil_simpanan_wajib = AmbilSimpanan::whereBetween('tanggal_ambil', [$this->start_date, $this->end_date])->where([['simpanan', 'wajib'], ['id_member', $value->id_member]])->get();
        }

        $years = date('Y', strtotime($this->end_date));

        $totals = SimpananWajib::whereBetween('created_at', [$this->start_date, $this->end_date])->get();
        $ambil = AmbilSimpanan::whereBetween('tanggal_ambil', [$this->start_date, $this->end_date])->where('simpanan', 'wajib')->get();

        return view('Exports.Excel.Simpanan.simpananWajib', [
            'data' => $members,
            'years' => $years,
            'totals' => $totals,
            'totalsAmbil' => $ambil,
        ]);
    }
}
