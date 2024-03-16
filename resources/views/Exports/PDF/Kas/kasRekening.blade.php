@extends('Layout.pdf')

@section('title', 'Kas Rekening')

@section('content')
<div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
    Mutasi KAS REKENING <br />
    Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
    Tahun Buku {{ $years }} <br />
    (Dalam Rupiah)
</div>

<table style="width: 100%; border-collapse: collapse;">
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
        <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
            {{ $data ? number_format($data->saldo_awal, 0, ',', '.') : '-' }}
        </td>
        <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
        </td>
        <td style="border: 1px solid #000; padding: 2px 10px; word-wrap: break-word; text-align: right;">
            {{ $data ? number_format($data->saldo_awal, 0, ',', '.') : '-' }}
        </td>
    </tr>

    @foreach ($datas as $d => $col)
        <tr>
            <td style="border: 1px solid #000; text-transform: uppercase; padding: 2px 10px; text-align: center;">
                {{ $col['bulan'] == 'Januari' ? '-' : $col['bulan'] }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px;">SETOR</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['setor_type'] == 'debet' ? number_format($col['setor'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['setor_type'] == 'kredit' ? number_format($col['setor'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($col['saldo_setor'], 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px;">BUNGA BANK</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['bunga_bank_type'] == 'debet' ? number_format($col['bunga_bank'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['bunga_bank_type'] == 'kredit' ? number_format($col['bunga_bank'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($col['saldo_bunga_bank'], 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px;">PAJAK</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['pajak_type'] == 'debet' ? number_format($col['pajak'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['pajak_type'] == 'kredit' ? number_format($col['pajak'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($col['saldo_pajak'], 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px;">ADM</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['adm_type'] == 'debet' ? number_format($col['adm'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['adm_type'] == 'kredit' ? number_format($col['adm'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($col['saldo_adm'], 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px;">PENARIKAN</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['penarikan_type'] == 'debet' ? number_format($col['penarikan'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $col['penarikan_type'] == 'kredit' ? number_format($col['penarikan'], 0, ',', '.') : '-' }}</td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ number_format($col['saldo_penarikan'], 0, ',', '.') }}</td>
        </tr>
    @endforeach
    <tr>
        <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;">
        </td>
        <td style="border: 1px solid #000; font-weight: bold; text-align: start; padding: 2px 10px;">
            Jumlah</td>
        <td style="border: 1px solid #000; font-weight: bold; padding: 2px 10px; font-weight: bold; text-align: right;">
            {{ $data ? number_format($data->total_debet, 0, ',', '.') : '-' }}</td>
        <td style="border: 1px solid #000; padding: 2px 10px; font-weight: bold; text-align: right;">
            {{ $data ? number_format($data->total_kredit, 0, ',', '.') : '-' }}</td>
        <td style="border: 1px solid #000; padding: 2px 10px; font-weight: bold; text-align: right;">
            {{ $data ? number_format($data->jumlah, 0, ',', '.') : '-' }}</td>
    </tr>
</table>
@endsection
