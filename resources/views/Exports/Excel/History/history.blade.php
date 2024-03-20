@extends('Layout.pdf')

@section('title', 'Riwayat Transaksi')

@section('content')
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="7" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Rekapitulasi Riwayat Transaksi
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="7" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan
        </td>
    </tr>
    <tr style="text-align: center; font-weight: 800; margin-bottom: 70px;">
        <td colspan="7" style="text-align: center; font-weight: 800; margin-bottom: 70px;">
            Tahun {{ $years }}
        </td>
    </tr>
    <br>
    <br>

    <table style="width: 100%">
        <tr>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                No
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Nama Anggota
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Nominal Masuk
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Nominal Keluar
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Nama Transaksi
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Jenis Transaksi
            </th>
            <th
                style="border: 1px solid #000; vertical-align: middle; padding: 2px 10px; word-wrap: break-word; text-align: center;">
                Tanggal Transaksi
            </th>
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
                    {{ $value['nominal'] ? $value['nominal'] : '-' }}
                </td>
                <td data-format="#,##0"
                    style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: right;">
                    {{ $value['nominal_keluar'] ? $value['nominal_keluar'] : '-' }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: center;">
                    {{ $value['nama_transaksi'] }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: center;">
                    {{ $value['type'] }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-transform: capitalize; text-align: center;">
                    {{ $value['tanggal'] }}
                </td>
            </tr>
        @endforeach
    </table>
@endsection
