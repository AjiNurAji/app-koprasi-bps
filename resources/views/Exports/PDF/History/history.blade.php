@extends('Layout.pdf')

@section('title', 'Kas Rekening')

@section('content')
    <div style="text-align: center; width: 100%; font-weight: 800; margin-bottom: 70px;">
        Rekapitulasi Riwayat Transaksi <br />
        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
        Tahun {{ $years }} <br />
    </div>

    <table style="width: 100%; border-collapse: collapse;">
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
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: left;">
                    {{ ucwords($value['name']) }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $value['nominal'] ? number_format($value['nominal'], 0, ',', '.') : '-' }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: right;">
                    {{ $value['nominal_keluar'] ? number_format($value['nominal_keluar'], 0, ',', '.') : '-' }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $value['nama_transaksi'] }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $value['type'] }}
                </td>
                <td style="border: 1px solid #000; padding: 2px 10px; text-align: center;">
                    {{ $value['tanggal'] }}
                </td>
            </tr>
        @endforeach
    </table>
@endsection
