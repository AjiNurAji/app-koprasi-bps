<?php

namespace App\Http\Controllers;

use App\Exports\kasRekeningExport;
use App\Exports\kasTunaiExport;
use App\Exports\pinjamanExport;
use App\Exports\simpananPokokExport;
use App\Exports\simpananSukarelaExport;
use App\Exports\simpananWajibExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function ExportSimpananPokok(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new simpananPokokExport($request->input('start_date'), $request->input('end_date')), 'simpananpokok.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportSimpananPokokCSV(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new simpananPokokExport($request->input('start_date'), $request->input('end_date')), 'simpananpokok.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function ExportSimpananWajib(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new simpananWajibExport($request->input('start_date'), $request->input('end_date')), 'simpananwajib.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportSimpananWajibCSV(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new simpananWajibExport($request->input('start_date'), $request->input('end_date')), 'simpananwajib.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function ExportSimpananSukarela(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new simpananSukarelaExport($request->input('start_date'), $request->input('end_date')), 'simpananwajib.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportSimpananSukarelaCSV(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new simpananSukarelaExport($request->input('start_date'), $request->input('end_date')), 'simpananwajib.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function ExportKasTunai(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new kasTunaiExport($request->input('start_date'), $request->input('end_date')), 'kastunai.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportKasTunaiCSV(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new kasTunaiExport($request->input('start_date'), $request->input('end_date')), 'kastunai.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function ExportKasRekening(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new kasRekeningExport($request->input('start_date'), $request->input('end_date')), 'kasrekening.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportKasRekeningCSV(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new kasRekeningExport($request->input('start_date'), $request->input('end_date')), 'kasrekening.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function Pinjaman(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        return Excel::download(new pinjamanExport($request->input('start_date'), $request->input('end_date')), 'pinjamananggota.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }
}
