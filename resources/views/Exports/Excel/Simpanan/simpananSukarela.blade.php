@extends('Layout.pdf')

@section('title', 'Simpanan Sukarela')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="9" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Rekapitulasi Simpanan Sukarela
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="9" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="9" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Tahun Buku {{ $years }}
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="9" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            (Dalam Rupiah)
        </td>
    </tr>
    <br>
    <br>

    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
                rowspan="2">No
            </th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Nama</th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Sukarela Dari Pembulatan</th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
                rowspan="2">
                SHU Yang Disimpan</th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; border-collapse: collapse; word-wrap: break-word; text-align: center;"
                colspan="5">
                Simpanan Sukarela</th>
        </tr>
        <tr>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px; border-collapse: collapse;">Awal
                {{ $years }}</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px; border-collapse: collapse;">Selama
                {{ $years }}
            </th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px; border-collapse: collapse;">Diambil
            </th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px; border-collapse: collapse;">Disimpan
                Kembali</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px; border-collapse: collapse;">Akhir
                {{ $years }}</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: center;">
                    {{ $d + 1 }}</td>
                <td
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-transform: capitalize;">
                    {{ ucwords($col['name']) }}</td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $col['sukarela'] ? $col['sukarela'] : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $col['shu'] ? $col['shu'] : '-' }}</td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $col['awal_tahun'] ? $col['awal_tahun'] : '-' }}</td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $col['simpanan_sukarela']->sum('selama_tahun') ? $col['simpanan_sukarela']->sum('selama_tahun') : '-' }}</td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $col['diambil'] ? $col['diambil'] : '-' }}</td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $col['simpanan_sukarela']->sum('disimpan_kembali') ? $col['simpanan_sukarela']->sum('disimpan_kembali') : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $col['akhir_tahun'] ? $col['akhir_tahun'] : '-' }}</td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px; border-collapse: collapse;"
                colspan="2">
                Total</td>
            <td data-format="#,##0"
                style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                {{ $data->sum('sukarela') ? $data->sum('sukarela') : '-' }}</td>
            <td data-format="#,##0"
                style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                {{ $data->sum('shu') ? $data->sum('shu') : '-' }}</td>
            <td data-format="#,##0"
                style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                {{ $data->sum('awal_tahun') ? $data->sum('awal_tahun') : '-' }}</td>
            <td data-format="#,##0"
                style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                {{ $total['total_selama_tahun'] ? $total['total_selama_tahun'] : '-' }}</td>
            <td data-format="#,##0"
                style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                {{ $total['total_diambil'] ? $total['total_diambil'] : '-' }}</td>
            <td data-format="#,##0"
                style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                {{ $total['total_disimpan_kembali'] ? $total['total_disimpan_kembali'] : '-' }}
            </td>
            <td data-format="#,##0"
                style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                {{ $data->sum('akhir_tahun') ? $data->sum('akhir_tahun') : '-' }}</td>
        </tr>
    </table>
@endsection
