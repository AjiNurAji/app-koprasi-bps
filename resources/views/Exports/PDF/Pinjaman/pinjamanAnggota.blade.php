@extends('Layout.pdf')

@section('title', 'Pinjaman Anggota')

@section('content')
    <div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
        Rekapitulasi Piutang Anggota <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun Buku {{ $years }} <br />
        (Dalam Rupiah)
    </div>

    <table style="width: 100%">
        <tr>
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
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
            <th style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;"
                rowspan="2">
                Sisa Piutang Bulan 31 Des
            </th>
        </tr>
        <tr>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Cicilan</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Bayar Langsung</th>
            <th style="text-align: center; border: 1px solid #000; padding: 2px 10px;">Total Bayar</th>
        </tr>

        @foreach ($data as $key => $value)
            <tr>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $key + 1 }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: left;">
                    {{ ucwords($value['name']) }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                    {{ $value['pinjaman_tahun_lalu'] ? $value['pinjaman_tahun_lalu'] : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                    {{ $value['pinjaman'] ? $value['pinjaman'] : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                    {{ $value['bayar']['cicilan']->sum('nominal') ? $value['bayar']['cicilan']->sum('nominal') : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                    {{ $value['bayar']['langsung']->sum('nominal') ? $value['bayar']['langsung']->sum('nominal') : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                    {{ $value['bayar']['cicilan']->sum('nominal') + $value['bayar']['langsung']->sum('nominal')
                        ? $value['bayar']['cicilan']->sum('nominal') + $value['bayar']['langsung']->sum('nominal')
                        : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                    {{ $value['sisa'] ? $value['sisa'] : '-' }}
                </td>
            </tr>
        @endforeach

        <tr>
            <td style="border: 1px solid #000; font-weight: 500; padding: 2px 10px; text-transform: capitalize; text-align: center;"
                colspan="2">
                TOTAL
            </td>
            <td data-format="#,##0"
                style="border: 1px solid #000; font-weight: 500; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $data->sum('pinjaman_tahun_lalu') ? $data->sum('pinjaman_tahun_lalu') : '-' }}
            </td>
            <td data-format="#,##0"
                style="border: 1px solid #000; font-weight: 500; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $data->sum('pinjaman') ? $data->sum('pinjaman') : '-' }}
            </td>
            <td data-format="#,##0"
                style="border: 1px solid #000; font-weight: 500; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $total['cicilan']->sum('nominal') ? $total['cicilan']->sum('nominal') : '-' }}
            </td>
            <td data-format="#,##0"
                style="border: 1px solid #000; font-weight: 500; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $total['langsung']->sum('nominal') ? $total['langsung']->sum('nominal') : '-' }}
            </td>
            <td data-format="#,##0"
                style="border: 1px solid #000; font-weight: 500; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $total['langsung']->sum('nominal') + $total['cicilan']->sum('nominal') ? $total['langsung']->sum('nominal') + $total['cicilan']->sum('nominal') : '-' }}
            </td>
            <td data-format="#,##0"
                style="border: 1px solid #000; font-weight: 500; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                {{ $data->sum('sisa') ? $data->sum('sisa') : '-' }}
            </td>
        </tr>
    </table>
@endsection
