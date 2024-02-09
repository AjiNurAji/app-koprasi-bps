<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\SimpananPokok;
use App\Models\Member;

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


        foreach ($bulan as $item) {
            for ($i = 0; $i < 12; $i++) {
                $simpananPokokCount[] = SimpananPokok::where('bulan', $item[$i])->where('tahun', date('Y'))->get()->count();
            }
        }

        return Inertia::render('Dashboard', ['chart' => ['simpanan' => $simpananPokokCount]]);
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
                'kekayaan' => ($data->awal_tahun === null ? null : $data->awal_tahun) + ($data->anggota_masuk === null ? null : $data->anggota_masuk),
            ];
        }

        $members = Member::orderBy('name', 'asc')->get();
        return Inertia::render('admin/Simpanan/Pokok', ['data' => $datas, 'members' => $members]);
    }

    public function simpananWajib()
    {
        return Inertia::render('admin/Simpanan/Wajib');
    }
}
