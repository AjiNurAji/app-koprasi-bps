@extends('Layout.pdf')

@section('title', 'Simpanan Sukarela')

@section('content')
    <div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
        Rekapitulasi Simpanan Sukarela <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ $years }} <br />
        (Dalam Rupiah)
    </div>

    <div style="width: 100%; max-width: 100%;">
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
                <th style="text-align: center; border: 1px solid #000; padding: 2px 10px; border-collapse: collapse;">
                    Diambil
                </th>
                <th style="text-align: center; border: 1px solid #000; padding: 2px 10px; border-collapse: collapse;">
                    Disimpan
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
                    <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                        {{ $col['sukarela'] ? number_format($col['sukarela'], 0, ',', '.') : '-' }}
                    </td>
                    <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                        {{ $col['shu'] ? number_format($col['shu'], 0, ',', '.') : '-' }}</td>
                    <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                        {{ $col['awal_tahun'] ? number_format($col['awal_tahun'], 0, ',', '.') : '-' }}</td>
                    <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                        {{ $col['simpanan_sukarela']->sum('selama_tahun') ? number_format($col['simpanan_sukarela']->sum('selama_tahun'), 0, ',', '.') : '-' }}
                    </td>
                    <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                        {{ $col['diambil'] ? number_format($col['diambil'], 0, ',', '.') : '-' }}</td>
                    <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                        {{ $col['simpanan_sukarela']->sum('disimpan_kembali') ? number_format($col['simpanan_sukarela']->sum('disimpan_kembali'), 0, ',', '.') : '-' }}
                    </td>
                    <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                        {{ $col['akhir_tahun'] ? number_format($col['akhir_tahun'], 0, ',', '.') : '-' }}</td>
                </tr>
            @endforeach
            <tr>
                <td style="border: 1px solid #000; text-align: center; padding: 2px 10px; border-collapse: collapse;"
                    colspan="2">
                    Total</td>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $data->sum('sukarela') ? number_format($data->sum('sukarela'), 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $data->sum('shu') ? number_format($data->sum('shu'), 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $data->sum('awal_tahun') ? number_format($data->sum('awal_tahun'), 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $total['total_selama_tahun'] ? number_format($total['total_selama_tahun'], 0, ',', '.') : '-' }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $total['total_diambil'] ? number_format($total['total_diambil'], 0, ',', '.') : '-' }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $total['total_disimpan_kembali'] ? number_format($total['total_disimpan_kembali'], 0, ',', '.') : '-' }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; border-collapse: collapse; text-align: right;">
                    {{ $data->sum('akhir_tahun') ? number_format($data->sum('akhir_tahun'), 0, ',', '.') : '-' }}</td>
            </tr>number_format(
        </table>
    </div>
@endsection
