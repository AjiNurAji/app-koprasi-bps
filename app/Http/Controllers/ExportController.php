<?php

namespace App\Http\Controllers;

use App\Exports\kasRekeningExport;
use App\Exports\kasTunaiExport;
use App\Exports\simpananPokokExport;
use App\Exports\simpananWajibExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function ExportSimpananPokok()
    {
        return Excel::download(new simpananPokokExport, 'simpananpokok.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportSimpananPokokCSV()
    {
        return Excel::download(new simpananPokokExport, 'simpananpokok.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function ExportSimpananWajib()
    {
        return Excel::download(new simpananWajibExport, 'simpananwajib.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportSimpananWajibCSV()
    {
        return Excel::download(new simpananWajibExport, 'simpananwajib.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function ExportKasTunai()
    {
        return Excel::download(new kasTunaiExport, 'kastunai.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportKasTunaiCSV()
    {
        return Excel::download(new kasTunaiExport, 'kastunai.csv', \Maatwebsite\Excel\Excel::CSV);
    }

    public function ExportKasRekening()
    {
        return Excel::download(new kasRekeningExport, 'kasrekening.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function ExportKasRekeningCSV()
    {
        return Excel::download(new kasRekeningExport, 'kasrekening.csv', \Maatwebsite\Excel\Excel::CSV);
    }
}
