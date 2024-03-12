@extends('Layout.pdf')

@section('title', 'Simpanan Wajib')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Rekapitulasi Simpanan Wajib
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Tahun Buku {{ $years }}
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            (Dalam Rupiah)
        </td>
    </tr>
    <br>
    <br>

    <table style="width: 100%;">
        <tr>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                No
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Nama</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Kekayaan Awal Tahun
                {{ $years }}</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Simpanan Wajib</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Anggota Keluar</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Kekayaan Per 31 Desember
                {{ $years }}</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px">{{ ucwords($col['name']) }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['simpanan_wajib']->sum('kekayaan_awal_tahun') ? $col['simpanan_wajib']->sum('kekayaan_awal_tahun') : '-' }}
                </td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right; ">
                    {{ $col['simpanan_wajib']->sum('simpanan_wajib') ? $col['simpanan_wajib']->sum('simpanan_wajib') : '-' }}
                </td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['ambil_simpanan_wajib']->sum('nominal') ? $col['ambil_simpanan_wajib']->sum('nominal') : '-' }}
                </td>
                <td data-format="#,##0" style="border: 1px solid #000;  padding: 2px 10px; text-align: right;">
                    {{ $col['simpanan_wajib']->sum('kekayaan_awal_tahun') + $col['simpanan_wajib']->sum('simpanan_wajib') - $col['ambil_simpanan_wajib']->sum('nominal') ? $col['simpanan_wajib']->sum('kekayaan_awal_tahun') + $col['simpanan_wajib']->sum('simpanan_wajib') - $col['ambil_simpanan_wajib']->sum('nominal') : '-' }}
                </td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $totals->sum('kekayaan_awal_tahun') ? $totals->sum('kekayaan_awal_tahun') : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $totals->sum('simpanan_wajib') ? $totals->sum('simpanan_wajib') : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $totalsAmbil->sum('nominal') ? $totalsAmbil->sum('nominal') : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $totals->sum('kekayaan_awal_tahun') + $totals->sum('simpanan_wajib') - $totalsAmbil->sum('nominal') ? $totals->sum('kekayaan_awal_tahun') + $totals->sum('simpanan_wajib') - $totalsAmbil->sum('nominal') : '-' }}
            </td>
        </tr>
    </table>
@endsection
