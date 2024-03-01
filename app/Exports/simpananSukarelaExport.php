<?php

namespace App\Exports;

use App\Models\SimpananSukarela;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class simpananSukarelaExport implements FromView, ShouldAutoSize
{
    use Exportable;

    public function view(): View
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

        return view('Exports.Excel.Simpanan.simpananSukarela', [
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
    }
}
