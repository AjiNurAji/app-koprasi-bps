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

        $start = $this->start_date;
        $end = $this->end_date;

        foreach ($members as $key => $value) {
            $members[$key]->simpanan_sukarela = SimpananSukarela::whereBetween('tanggal_transakssi', [$start, $end])->where('id_member', $value->id_member)->get();

            $simpanan = SimpananSukarela::whereBetween('tanggal_transakssi', [$start, $end])->where('id_member', $value->id_member)->orderBy('tanggal_transakssi', 'desc')->get()->first();

            $members[$key]->shu = $simpanan?->shu;

            $members[$key]->sukarela = $simpanan?->sukarela;

            $members[$key]->awal_tahun = $simpanan?->awal_tahun;

            $members[$key]->diambil = AmbilSimpanan::whereBetween('tanggal_ambil', [$start, $end])
                ->where([
                    ['simpanan', 'sukarela'],
                    ['id_member', $value->id_member]
                ])->get()->sum('nominal');

            $members[$key]->akhir_tahun = $simpanan?->akhir_taun;
        }

        $totalSelamaTahun = SimpananSukarela::whereBetween('tanggal_transaksi', [$start, $end])->get()->sum('selama_tahun');
        $totalDiambil = AmbilSimpanan::whereBetween('tanggal_ambil', [$start, $end])->where('simpanan', 'sukarela')->get()->sum('nominal');
        $totalDisimpanKembali = SimpananSukarela::whereBetween('tanggal_transaksi', [$start, $end])->get()->sum('disimpan_kembali');

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
