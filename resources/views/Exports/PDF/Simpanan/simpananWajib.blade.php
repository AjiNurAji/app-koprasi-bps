@extends('Layout.pdf')

@section('title', 'Simpanan Wajib')

@section('content')
    <div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
        Rekapitulasi Simpanan Wajib <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ $years }} <br />
        (Dalam Rupiah)
    </div>

    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                No
            </th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Nama</th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Kekayaan Awal Tahun
                {{ $years }}</th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Simpanan Wajib</th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Anggota Keluar</th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Kekayaan Per 31 Desember
                {{ $years }}</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px;">{{ ucwords($col['name']) }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ $col['simpanan_wajib']->sum('kekayaan_awal_tahun') ? number_format($col['simpanan_wajib']->sum('kekayaan_awal_tahun'), 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right; ">
                    {{ $col['simpanan_wajib']->sum('simpanan_wajib') ? number_format($col['simpanan_wajib']->sum('simpanan_wajib'), 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ $col['ambil_simpanan_wajib']->sum('nominal') ? number_format($col['ambil_simpanan_wajib']->sum('nominal'), 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse;  padding: 2px 10px; text-align: right;">
                    {{ (($col['simpanan_wajib']->sum('kekayaan_awal_tahun') + $col['simpanan_wajib']->sum('simpanan_wajib')) - $col['ambil_simpanan_wajib']->sum('nominal')) ? number_format(($col['simpanan_wajib']->sum('kekayaan_awal_tahun') + $col['simpanan_wajib']->sum('simpanan_wajib')) - $col['ambil_simpanan_wajib']->sum('nominal'), 0, ',', '.') : '-' }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; border-collapse: collapse; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ $totals->sum('kekayaan_awal_tahun') ? number_format($totals->sum('kekayaan_awal_tahun'), 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ $totals->sum('simpanan_wajib') ? number_format($totals->sum('simpanan_wajib'), 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ $totalsAmbil->sum('nominal') ? number_format($totalsAmbil->sum('nominal'), 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ (($totals->sum('kekayaan_awal_tahun') + $totals->sum('simpanan_wajib')) - $totalsAmbil->sum('nominal')) ? number_format(($totals->sum('kekayaan_awal_tahun') + $totals->sum('simpanan_wajib')) - $totalsAmbil->sum('nominal'), 0, ',', '.') : '-' }}</td>
        </tr>
    </table>
@endsection
