@extends('Layout.pdf')

@section('title', 'Kas Tunai')

@section('content')
    <div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
        Mutasi KAS TUNAI <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ date('Y') }} <br />
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
                Bulan</th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Masuk</th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Keluar</th>
            <th
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Saldo</th>
        </tr>
        <tr>
            <td
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                1
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                2
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                3
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                4
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                5
            </td>
        </tr>
        <tr>
            <td
                style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; word-wrap: break-word; text-align: left;">
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; word-wrap: break-word; text-align: left;">
                Saldo Awal
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; word-wrap: break-word; text-align: left;">
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; word-wrap: break-word; text-align: left;">
            </td>
            <td
                style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; word-wrap: break-word; text-align: left;">
                {{ $data ? number_format($data->saldo_awal) : 0 }}
            </td>
        </tr>

        @foreach ($tunai as $d => $col)
            <tr>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px;">{{ $col['bulan'] }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['masuk']) }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['keluar']) }}</td>
                <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                    {{ number_format($col['saldo']) }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; border-collapse: collapse; text-align: center; padding: 2px 10px;">
            </td>
            <td style="border: 1px solid #000; border-collapse: collapse; text-align: center; padding: 2px 10px;">
                Jumlah</td>
            <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ $data ? number_format($data->total_masuk) : 0 }}</td>
            <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ $data ? number_format($data->total_keluar) : 0 }}</td>
            <td style="border: 1px solid #000; border-collapse: collapse; padding: 2px 10px; text-align: right;">
                {{ $data ? number_format($data->jumlah) : 0 }}</td>
        </tr>
    </table>
@endsection
