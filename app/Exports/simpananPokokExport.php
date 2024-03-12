<?php

namespace App\Exports;

use App\Models\Member;
use App\Models\SimpananPokok;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class simpananPokokExport implements FromView, ShouldAutoSize
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

        foreach ($members as $key => $value) {
            $members[$key]->simpanan_pokok = SimpananPokok::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->where('id_member', $value->id_member)->get();
            $members[$key]->awal_tahun = SimpananPokok::where([['id_member', $value->id_member], ['tahun', $years - 1]])->get()->sum('anggota_masuk') - SimpananPokok::where([['id_member', $value->id_member], ['tahun', $years - 1]])->get()->sum('anggota_keluar');
        }

        // dd($members, $this->start_date, $this->end_date);

        $awalTahunPokok = SimpananPokok::where('tahun', $years - 1)->get()->sum('anggota_masuk') - SimpananPokok::where('tahun', $years - 1)->get()->sum('anggota_keluar');
        $anggotaMasukPokok = SimpananPokok::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->get()->sum('anggota_masuk');
        $anggotaKeluarPokok = SimpananPokok::whereBetween('tanggal_transaksi', [$this->start_date, $this->end_date])->get()->sum('anggota_keluar');
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        return view('Exports.Excel.Simpanan.simpananPokok', [
            'data' => $members,
            'years' => $years,
            'total' => [
                'awal_tahun' => $awalTahunPokok,
                'anggota_masuk' => $anggotaMasukPokok,
                'anggota_keluar' => $anggotaKeluarPokok,
                'jumlah' => $totalPokok
            ]
        ]);
    }
}
