<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\SimpananPokok;
use App\Models\Member;
use Carbon\Carbon;

class HomepageController extends Controller
{
    private function getUserLogin()
    {
        if (Auth::guard('admin')->check()) {
            return Auth::guard('admin')->user();
        } else {
            return Auth::guard('member')->user();
        }
    }

    public function index()
    {
        $bulan = [
            [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember',
            ]
        ];

        $hari = [
            [
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
                'Minggu'
            ]
        ];

        // simpanan chart
        foreach ($bulan as $item) {
            for ($i = 0; $i < 12; $i++) {
                $simpananPokokCount[] = SimpananPokok::where('bulan', $item[$i])->where('tahun', date('Y'))->get()->count();
            }
        }

        foreach ($hari as $item) {
            for ($i = 0; $i < 7; $i++) {
                $awal_tahun_perhari[] = SimpananPokok::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->where('hari', $item[$i])->get()->sum('awal_tahun');
                $anggota_masuk_perhari[] = SimpananPokok::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->where('hari', $item[$i])->get()->sum('anggota_masuk');
                $anggota_keluar_perhari[] = SimpananPokok::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->where('hari', $item[$i])->get()->sum('anggota_keluar');
                $totalSimpananPerhari[] = $awal_tahun_perhari[$i] + $anggota_masuk_perhari[$i] - $anggota_keluar_perhari[$i];
            }
        }

        // total card
        $awalTahunPokok = SimpananPokok::where('tahun', date('Y'))->sum('awal_tahun');
        $anggotaMasukPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_masuk');
        $anggotaKeluarPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;


        // dd($awal_tahun_perhari, $anggota_masuk_perhari, $totalSimpananPerhari);

        return Inertia::render('Dashboard', [
            'chart' => ['perbulan' => $simpananPokokCount, 'perhari' => $totalSimpananPerhari],
            'cards' => ['simpananPokok' => $totalPokok]
        ]);
    }

    public function simpananPokok()
    {
        $simpananPokok = SimpananPokok::where('tahun', date('Y'))->get();

        foreach ($simpananPokok as $data) {
            $datas[] = [
                'name' => $data->member->name,
                'awal_tahun' => $data->awal_tahun === null ? null : $data->awal_tahun,
                'anggota_masuk' => $data->anggota_masuk === null ? null : $data->anggota_masuk,
                'anggota_keluar' => $data->anggota_keluar === null ? null : $data->anggota_keluar,
                'kekayaan' => ($data->awal_tahun === null ? null : $data->awal_tahun) + ($data->anggota_masuk === null ? null : $data->anggota_masuk) - ($data->anggota_keluar === null ? null : $data->anggota_keluar),
            ];
        }

        $awalTahunPokok = SimpananPokok::where('tahun', date('Y'))->sum('awal_tahun');
        $anggotaMasukPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_masuk');
        $anggotaKeluarPokok = SimpananPokok::where('tahun', date('Y'))->sum('anggota_keluar');
        $totalPokok = $awalTahunPokok + $anggotaMasukPokok - $anggotaKeluarPokok;

        $members = Member::orderBy('name', 'asc')->get();
        return Inertia::render('admin/Simpanan/Pokok', ['data' => isset($datas) ? $datas : $simpananPokok, 'members' => $members, 'total' => [
            'awal_tahun' => $awalTahunPokok,
            'anggota_masuk' => $anggotaMasukPokok,
            'anggota_keluar' => $anggotaKeluarPokok,
            'jumlah' => $totalPokok
        ]]);
    }

    public function simpananWajib()
    {
        return Inertia::render('admin/Simpanan/Wajib');
    }
}
