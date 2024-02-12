@extends('Layout.pdf')

@section('title', 'Simpanan Wajib')

@section('content')
    <div style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        Rekapitulasi Simpanan Wajib <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ date('Y') }} <br />
        (Dalam Rupiah)
    </div>

    <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
            <th
                style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;">
                No
            </th>
            <th
                style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;">
                Nama</th>
            <th
                style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;">
                Kekayaan Awal
                {{ date('Y') }}</th>
            <th
                style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;">
                Simpanan Wajib</th>
            <th
                style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;">
                Anggota Keluar</th>
            <th
                style="border: 1px solid; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;">
                Kekayaan Per 31 Desember
                {{ date('Y') }}</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px;">{{ $col['name'] }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['kekayaan_awal_tahun']) }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['simpanan_wajib']) }}</td>
                <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['anggota_keluar']) }}</td>
                <td style="border: 1px solid;  border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['kekayaan']) }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid; border-collapse: collapse; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['kekayaan_awal_tahun']) }}</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['simpanan_wajib']) }}</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['anggota_keluar']) }}</td>
            <td style="border: 1px solid; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ number_format($total['jumlah']) }}</td>
        </tr>
    </table>
@endsection
