@extends('Layout.pdf')

@section('title', 'Pinjaman Anggota')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="5" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Rekapitulasi Piutang Anggota
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

    <table style="width: 100%">
        <tr>
            <th class="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">
                No
            </th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Nama Anggota
            </th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Piutang Lama (Akhir Tahun {{ $years - 1 }})
            </th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Piutang Baru Tahun {{ $years }}
            </th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                colspan="3">
                Pembayaran Selama Tahun {{ $years }}
            </th>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Sisa Piutang Bulan 31 Des
            </th>
        </tr>
        <tr>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Cicilan</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Bayar Langsung</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Total Bayar</th>
        </tr>
    </table>

    @foreach ($data as $key => $value)
        <tr>
            <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                {{ $d + 1 }}
            </td>
            <td style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: left;">
                {{ ucwords($col['name']) }}
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $col['pinjaman_tahun_lalu'] ? $col['pinjaman_tahun_lalu'] : '-' }}
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $col['total_pinjaman'] ? $col['total_pinjaman'] : '-' }}
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $col['bayar']->sum('cicilan') ? $col['bayar']->sum('cicilan') : '-' }}
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $col['bayar']->sum('langsung') ? $col['bayar']->sum('langsung') : '-' }}
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ ($col['bayar']->sum('cicilan') + $col['bayar']->sum('langsung')) ? ($col['bayar']->sum('cicilan') + $col['bayar']->sum('langsung')) : '-' }}
            </td>
            <td data-format="#,##0" style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $col['sisa'] ? $col['sisa'] : '-' }}
            </td>
        </tr>
    @endforeach

    <tr>

        <td style="border: 1px solid #000; font-medium padding: 2px 10px; text-transform: capitalize; text-align: center;">
            TOTAL
        </td>
        <td data-format="#,##0" style="border: 1px solid #000; font-medium padding: 2px 10px; text-transform: capitalize; text-align: right;">
            {{ $data->sum('pinjaman_tahun_lalu') ? $data->sum('pinjaman_tahun_lalu') : '-' }}
        </td>
        <td data-format="#,##0" style="border: 1px solid #000; font-medium padding: 2px 10px; text-transform: capitalize; text-align: right;">
            {{ $data->sum('total_pinjaman') ? $data->sum('total_pinjaman') : '-' }}
        </td>
        <td data-format="#,##0" style="border: 1px solid #000; font-medium padding: 2px 10px; text-transform: capitalize; text-align: right;">
            {{ $data->sum('cicilan') ? $data->sum('cicilan') : '-' }}
        </td>
        <td data-format="#,##0" style="border: 1px solid #000; font-medium padding: 2px 10px; text-transform: capitalize; text-align: right;">
            {{ $data->sum('langsung') ? $data->sum('langsung') : '-' }}
        </td>
        <td data-format="#,##0" style="border: 1px solid #000; font-medium padding: 2px 10px; text-transform: capitalize; text-align: right;">
            {{ ($data->sum('langsung') + $data->sum('cicilan')) ? ($data->sum('langsung') + $data->sum('cicilan')) : '-' }}
        </td>
        <td data-format="#,##0" style="border: 1px solid #000; font-medium padding: 2px 10px; text-transform: capitalize; text-align: right;">
            {{ $data->sum('sisa') ? $data->sum('sisa') : '-' }}
        </td>
    </tr>
@endsection
