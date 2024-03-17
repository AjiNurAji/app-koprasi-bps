<?php

namespace App\Exports;

use App\Models\BayarPinjaman;
use App\Models\Member;
use App\Models\Pinjaman;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class pinjamanExport implements FromView, ShouldAutoSize
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
        $member = Member::all();

        $start = $this->start_date;
        $end = $this->end_date;

        $years = date('Y', strtotime($this->end_date));

        $start_tahun_lalu = Carbon::createFromDate(date('Y', strtotime($start)) - 1)->startOfYear()->rawFormat("Y-m-d");
        $end_tahun_lalu = Carbon::createFromDate(date('Y', strtotime($end)) - 1)->endOfYear()->rawFormat("Y-m-d");

        foreach ($member as $key => $value) {
            // pinjaman baru
            $pinjaman = Pinjaman::whereBetween('tanggal_pinjam', [$start, $end])
                ->where("id_member", $value->id_member)->get();

            // bayar pinjaman
            $bayarCicilan = BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                ->where([
                    ["id_member", $value->id_member],
                    ["jenis", "cicilan"]
                ])
                ->get();

            $bayarLangsung = BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                ->where([
                    ["id_member", $value->id_member],
                    ["jenis", "langsung"]
                ])
                ->get();

            // pinjaman tahun lalu
            $pinjamanTahunLalu = Pinjaman::whereBetween('tanggal_pinjam', [
                $start_tahun_lalu,
                $end_tahun_lalu
            ])->where("id_member", $value->id_member)->orderBy("created_at", "desc")
                ->get()->first();

            // bayar pinjaman tahun lalu
            $bayarTahunLalu = BayarPinjaman::whereBetween('tanggal_bayar', [
                $start_tahun_lalu,
                $end_tahun_lalu
            ])->where("id_member", $value->id_member)
                ->orderBy("created_at", "desc")
                ->get()->first();

            $member[$key]->pinjaman = $pinjaman?->sum('nominal');
            $member[$key]->bayar['cicilan'] = $bayarCicilan;
            $member[$key]->bayar['langsung'] = $bayarLangsung;
            $member[$key]->pinjaman_tahun_lalu = $pinjamanTahunLalu?->nominal;
            $member[$key]->sisa = $bayarTahunLalu ? $bayarTahunLalu->sisa - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0)) : (
                $pinjamanTahunLalu
                ?
                $pinjamanTahunLalu->sisa - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0))
                :
                $pinjaman->sum('nominal') - (($bayarCicilan ? $bayarCicilan->sum('nominal') : 0) + ($bayarLangsung ? $bayarLangsung->sum('nominal') : 0))
            );
        }

        return view("Exports.Excel.Pinjaman.pinjamanAnggota", [
            "years" => $years,
            "data" => $member,
            "total" => [
                "cicilan" => BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                    ->where("jenis", "cicilan")
                    ->get(),

                "langsung" => BayarPinjaman::whereBetween('tanggal_bayar', [$start, $end])
                    ->where("jenis", "langsung")
                    ->get(),
            ]
        ]);
    }
}
