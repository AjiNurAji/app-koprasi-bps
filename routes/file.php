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
    
    Route::post('/simpanan/sukarela/pdf', [PDFController::class, 'ExportSimpananSukarelaPDF'])->name('simpanan_sukarela_pdf');
    Route::post('/simpanan/sukarela/excel', [ExportController::class, 'ExportSimpananSukarela'])->name('simpanan_sukarela_excel');
    Route::post('/simpanan/sukarela/csv', [ExportController::class, 'ExportSimpananSukarelaCSV'])->name('simpanan_sukarela_csv');

    Route::post('/kas/tunai/pdf', [PDFController::class, 'ExportKasTunaiPDF'])->name('kas_tunai_pdf');
    Route::post('/kas/tunai/excel', [ExportController::class, 'ExportKasTunai'])->name('kas_tunai_excel');
    Route::post('/kas/tunai/csv', [ExportController::class, 'ExportKasTunaiCSV'])->name('kas_tunai_csv');

    Route::post('/kas/rekening/pdf', [PDFController::class, 'ExportKasRekeningPDF'])->name('kas_rekening_pdf');
    Route::post('/kas/rekening/excel', [ExportController::class, 'ExportKasRekening'])->name('kas_rekening_excel');
    Route::post('/kas/rekening/csv', [ExportController::class, 'ExportKasRekeningCSV'])->name('kas_rekening_csv');

    Route::post('/history/pdf', [PDFController::class, 'HistoryPDF'])->name('history_pdf');
    Route::post('/history/excel', [ExportController::class, 'History'])->name('history_excel');
    Route::post('/history/csv', [ExportController::class, 'HistoryCSV'])->name('history_csv');
});