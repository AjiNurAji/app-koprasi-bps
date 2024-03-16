@extends('Layout.pdf')

@section('title', 'Kas Tunai')

@section('content')
    <div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
        Mutasi KAS TUNAI <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ $years }} <br />
        (Dalam Rupiah)
    </div>


    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                NO
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                BULAN</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                MASUK</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                KELUAR</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                SALDO</th>
        </tr>
        <tr>
            <td
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                1
            </td>
            <td
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                2
            </td>
            <td
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                3
            </td>
            <td
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                4
            </td>
            <td
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                5
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: left;">
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: left;">
                SALDO AWAL
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: left;">
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: left;">
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
                {{ $data ? number_format($data->saldo_awal, 0, ',', '.') : '-' }}
            </td>
        </tr>

        @foreach ($tunai as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px;">{{ $col['bulan'] }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['masuk'] ?  number_format($col['masuk'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['keluar'] ?  number_format($col['keluar'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['saldo'] ? number_format($col['saldo'], 0, ',', '.') : '-' }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;">
            </td>
            <td style="border: 1px solid #000; font-weight: bold; text-align: center; padding: 2px 10px;">
                Jumlah</td>
            <td style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; text-align: right;">
                {{ $data ? number_format($data->total_masuk, 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; text-align: right;">
                {{ $data ? number_format($data->total_keluar, 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; text-align: right;">
                {{ $data ? number_format($data->jumlah, 0, ',', '.') : '-' }}</td>
        </tr>
    </table>
@endsection
