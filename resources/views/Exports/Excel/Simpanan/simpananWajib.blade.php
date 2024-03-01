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
                {{ date('Y') }}</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Simpanan Wajib</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Anggota Keluar</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Kekayaan Per 31 Desember
                {{ date('Y') }}</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize;">{{ $col['name'] }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['kekayaan_awal_tahun'] ? number_format($col['kekayaan_awal_tahun'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right; ">
                    {{ $col['simpanan_wajib'] ? number_format($col['simpanan_wajib'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['anggota_keluar'] ? number_format($col['anggota_keluar'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000;  padding: 2px 10px; text-align: right;">
                    {{ $col['kekayaan'] ? number_format($col['kekayaan'], 0, ',', '.') : '-' }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['kekayaan_awal_tahun'] ? number_format($total['kekayaan_awal_tahun'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['simpanan_wajib'] ? number_format($total['simpanan_wajib'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['anggota_keluar'] ? number_format($total['anggota_keluar'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['jumlah'] ? number_format($total['jumlah'], 0, ',', '.') : '-' }}</td>
        </tr>
    </table>
@endsection
