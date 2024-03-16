@extends('Layout.pdf')

@section('title', 'Kas Tunai')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Mutasi KAS TUNAI
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Tahun Buku {{ $years }}
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            (Dalam Rupiah)
        </td>
    </tr>
    <br>
    <br>

    <table style="width: 100%;">
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
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
                {{ $data->saldo_awal ? $data->saldo_awal : '-' }}
            </td>
        </tr>

        @foreach ($tunai as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px;">{{ strtoupper($col['bulan']) }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['masuk'] ?  $col['masuk'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['keluar'] ?  $col['keluar'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['saldo'] ? $col['saldo'] : '-' }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000;  text-align: center; padding: 2px 10px;">
            </td>
            <td style="border: 1px solid #000; font-weight: bold; text-align: center; padding: 2px 10px;">
                Jumlah</td>
            <td data-format="#,##0" style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; text-align: right;">
                {{ $data->total_masuk? $data->total_masuk : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; text-align: right;">
                {{ $data->total_keluar ? $data->total_keluar : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; text-align: right;">
                {{ $data->jumlah ? $data->jumlah : '-' }}</td>
        </tr>
    </table>
@endsection
