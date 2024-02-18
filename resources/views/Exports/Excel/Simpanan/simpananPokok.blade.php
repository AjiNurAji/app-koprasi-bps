@extends('Layout.pdf')

@section('title', 'Simpanan Pokok')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Rekapitulasi Simpanan Pokok
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Tahun Buku {{ date('Y') }}
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
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">No
            </th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Nama</th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                colspan="3">
                Simpanan Pokok</th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Kekayaan Per 31 Desember
                {{ date('Y') }}</th>
        </tr>
        <tr>
            <th style="border: 1px solid #000; padding: 2px 10px;">Awal Tahun {{ date('Y') }}</th>
            <th style="border: 1px solid #000; padding: 2px 10px;">Anggota Masuk</th>
            <th style="border: 1px solid #000; padding: 2px 10px;">Anggota Keluar</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px;">{{ $col['name'] }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['awal_tahun']) }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['anggota_masuk']) }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['anggota_keluar']) }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['kekayaan']) }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($total['awal_tahun']) }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($total['anggota_masuk']) }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($total['anggota_keluar']) }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($total['jumlah']) }}</td>
        </tr>
    </table>
@endsection
