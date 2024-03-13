<?php

namespace App\Exports;

use App\Models\AmbilSimpanan;
use App\Models\Member;
use App\Models\SimpananSukarela;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class simpananSukarelaExport implements FromView, ShouldAutoSize
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
        $years = date('Y', strtotime($this->end_date));

        $start = Carbon::createFromDate(date('Y', strtotime($this->start_date)), date('m', strtotime($this->start_date)), date('d', strtotime($this->start_date)))->startOfDay();
        $end = Carbon::createFromDate(date('Y', strtotime($this->end_date)), date('m', strtotime($this->end_date)), date('d', strtotime($this->end_date)))->endOfDay();

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

        return view('Exports.Excel.Simpanan.simpananSukarela', [
            'data' => $members,
            'years' => $years,
            'total' => [
                'total_selama_tahun' => $totalSelamaTahun,
                'total_diambil' => $totalDiambil,
                'total_disimpan_kembali' => $totalDisimpanKembali,
            ]
        ]);
    }
}
