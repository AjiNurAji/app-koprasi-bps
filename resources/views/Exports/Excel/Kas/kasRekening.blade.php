@extends('Layout.pdf')

@section('title', 'Kas Rekening')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Mutasi REKENING BANK
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Tahun Buku {{ date('Y') }}
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
                BLN
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                BULAN</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                DEBET</th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                KREDIT</th>
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
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                JANUARI
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: left;">
                SALDO AWAL
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
                {{ $data ? $data->saldo_awal : '-' }}
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
                {{ $data ? $data->saldo_awal : '-' }}
            </td>
        </tr>

        @foreach ($datas as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $col['bulan'] == 'Januari' ? null : strtoupper($col['bulan'] ) }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px;">SETOR</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['setor_type'] == 'debet' ? $col['setor'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['setor_type'] == 'kredit' ? $col['setor'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['saldo_setor'] }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px;">BUNGA BANK</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['bunga_bank_type'] == 'debet' ? $col['bunga_bank'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['bunga_bank_type'] == 'kredit' ? $col['bunga_bank'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['saldo_bunga_bank'] }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px;">PAJAK</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['pajak_type'] == 'debet' ? $col['pajak'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['pajak_type'] == 'kredit' ? $col['pajak'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['saldo_pajak'] }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px;">ADM</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['adm_type'] == 'debet' ? $col['adm'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['adm_type'] == 'kredit' ? $col['adm'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['saldo_adm'] }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px;">PENARIKAN</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['penarikan_type'] == 'debet' ? $col['penarikan'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['penarikan_type'] == 'kredit' ? $col['penarikan'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['saldo_penarikan'] }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;">
            </td>
            <td style="border: 1px solid #000; font-weight: bold; text-align: start; padding: 2px 10px;">
                Jumlah</td>
            <td data-format="#,##0" style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; font-weight: bold; text-align: right;">
                {{ $data->total_debet ? $data->total_debet : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; font-weight: bold; text-align: right;">
                {{ $data->total_kredit ? $data->total_kredit : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; font-weight: bold; text-align: right;">
                {{ $data->jumlah ? $data->jumlah : '-' }}</td>
        </tr>
    </table>
@endsection
