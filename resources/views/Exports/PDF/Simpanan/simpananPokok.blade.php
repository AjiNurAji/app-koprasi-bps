@extends('Layout.pdf')

@section('title', 'Simpanan Pokok')

@section('content')
    <div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
        Rekapitulasi Simpanan Pokok <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ date('Y') }} <br />
        (Dalam Rupiah)
    </div>

    <table style="width: 100%; border-collapse: collapse;">
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
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Awal Tahun {{ date('Y') }}</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Anggota Masuk</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Anggota Keluar</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px;">{{ $col['name'] }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['awal_tahun'] ? number_format($col['awal_tahun'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['anggota_masuk'] ? number_format($col['anggota_masuk'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['anggota_keluar'] ? number_format($col['anggota_keluar'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['kekayaan'] ? number_format($col['kekayaan'], 0, ',', '.') : '-' }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['awal_tahun'] ? number_format($total['awal_tahun'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['anggota_masuk'] ? number_format($total['anggota_masuk'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['anggota_keluar'] ? number_format($total['anggota_keluar'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['jumlah'] ? number_format($total['jumlah'], 0, ',', '.') : '-' }}</td>
        </tr>
    </table>
@endsection
