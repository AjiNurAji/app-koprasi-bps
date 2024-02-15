@extends('Layout.pdf')

@section('title', 'Simpanan Pokok')

@section('content')
    <div style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        Rekapitulasi Simpanan Pokok <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ date('Y') }} <br />
        (Dalam Rupiah)
    </div>

    <table border="1" style="border-collapse: collapse; width: 100%;">
        <th style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
            rowspan="2">No
        </th>
        <th style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
            rowspan="2">
            Nama</th>
        <th style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
            colspan="3">
            Simpanan Pokok</th>
        <th style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
            rowspan="2">
            Kekayaan Per 31 Desember
            {{ date('Y') }}</th>
        </tr>
        <tr>
            <th style="border: 1px solid; border-collapse: collapse; padding: 2px 10px;">Awal Tahun {{ date('Y') }}</th>
            <th style="border: 1px solid; border-collapse: collapse; padding: 2px 10px;">Anggota Masuk</th>
            <th style="border: 1px solid; border-collapse: collapse; padding: 2px 10px;">Anggota Keluar</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; width: 30%">{{ $col['name'] }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right; width: 20%">
                    {{ number_format($col['awal_tahun']) }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right; width: 20%">
                    {{ number_format($col['anggota_masuk']) }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right; width: 20%">
                    {{ number_format($col['anggota_keluar']) }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right; width: auto">
                    {{ number_format($col['kekayaan']) }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid; border-collapse: collapse; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['awal_tahun']) }}</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['anggota_masuk']) }}</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['anggota_keluar']) }}</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['jumlah']) }}</td>
        </tr>
    </table>
@endsection
