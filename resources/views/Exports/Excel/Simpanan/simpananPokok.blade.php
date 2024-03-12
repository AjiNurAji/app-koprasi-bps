@extends('Layout.pdf')

@section('title', 'Simpanan Pokok')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Rekapitulasi Simpanan Pokok
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="6" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Tahun Buku {{ $years }}
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
                {{ $years }}</th>
        </tr>
        <tr>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Awal Tahun {{ $years }}</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Anggota Masuk</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Anggota Keluar</th>
        </tr>

        @foreach ($data as $d => $col)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $d + 1 }}</td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize;">
                    {{ ucwords($col['name']) }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['awal_tahun'] ? $col['awal_tahun'] : '-' }}</td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['simpanan_pokok']->sum('anggota_masuk') ? $col['simpanan_pokok']->sum('anggota_masuk') : '-' }}
                </td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['simpanan_pokok']->sum('anggota_keluar') ? $col['simpanan_pokok']->sum('anggota_keluar') : '-' }}
                </td>
                <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $col['awal_tahun'] + $col['simpanan_pokok']->sum('anggota_masuk') - $col['simpanan_pokok']->sum('anggota_keluar') ? $col['awal_tahun'] + $col['simpanan_pokok']->sum('anggota_masuk') - $col['simpanan_pokok']->sum('anggota_keluar') : '-' }}
                </td>
            </tr>
        @endforeach
        <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 2px 10px;" colspan="2">
                Total</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['awal_tahun'] ? $total['awal_tahun'] : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['anggota_masuk'] ? $total['anggota_masuk'] : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['anggota_keluar'] ? $total['anggota_keluar'] : '-' }}</td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                {{ $total['jumlah'] ? $total['jumlah'] : '-' }}</td>
        </tr>
    </table>
@endsection
