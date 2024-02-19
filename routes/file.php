<?php

use App\Http\Controllers\ExportController;
use App\Http\Controllers\PDFController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:admin', 'file'])->group(function () {
    // pdf, excel, csv
    Route::post('/simpanan/pokok/pdf', [PDFController::class, 'ExportSimpananPokokPDF'])->name('simpanan_pokok_pdf');
    Route::post('/simpanan/pokok/excel', [ExportController::class, 'ExportSimpananPokok'])->name('simpanan_pokok_excel');
    Route::post('/simpanan/pokok/csv', [ExportController::class, 'ExportSimpananPokokCSV'])->name('simpanan_pokok_csv');
    
    Route::post('/simpanan/wajib/pdf', [PDFController::class, 'ExportSimpananWajibPDF'])->name('simpanan_wajib_pdf');
    Route::post('/simpanan/wajib/excel', [ExportController::class, 'ExportSimpananWajib'])->name('simpanan_wajib_excel');
    Route::post('/simpanan/wajib/csv', [ExportController::class, 'ExportSimpananWajibCSV'])->name('simpanan_wajib_csv');

    Route::post('/kas/tunai/pdf', [PDFController::class, 'ExportKasTunaiPDF'])->name('kas_tunai_pdf');
    Route::post('/kas/tunai/excel', [ExportController::class, 'ExportKasTunai'])->name('kas_tunai_excel');
    Route::post('/kas/tunai/csv', [ExportController::class, 'ExportKasTunaiCSV'])->name('kas_tunai_csv');

    Route::post('/kas/rekening/pdf', [PDFController::class, 'ExportKasRekeningPDF'])->name('kas_rekening_pdf');
    Route::post('/kas/rekening/excel', [ExportController::class, 'ExportKasRekening'])->name('kas_rekening_excel');
    Route::post('/kas/rekening/csv', [ExportController::class, 'ExportKasRekeningCSV'])->name('kas_rekening_csv');
});