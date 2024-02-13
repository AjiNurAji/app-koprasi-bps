const SimpananPokokExport = ({ data, total, tableRef }) => {
    return (
        <table className="w-full hidden" ref={tableRef}>
            <thead>
                <tr>
                    <th
                        colSpan={6}
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Rekapitulasi Simpanan Pokok <br />
                        Koperasi Kesejahteraan Pegawai BPS Kab. Kuningan <br />
                        Tahun Buku {new Date().getFullYear()} <br />
                        (Dalam Rupiah) <br /> <br /> <br />
                    </th>
                </tr>
                <tr>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                        rowSpan={2}
                    >
                        No
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                        rowSpan={2}
                    >
                        Nama
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                        colSpan={3}
                    >
                        Simpanan Pokok
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                        rowSpan={2}
                    >
                        Kekayaan Per 31 Desember {new Date().getFullYear()}
                    </th>
                </tr>
                <tr>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Awal Tahun {new Date().getFullYear()}
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Anggota Masuk
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Anggota Keluar
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                                textAlign: "center",
                            }}
                        >
                            {i + 1}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                            }}
                        >
                            {item.name}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                            }}
                        >
                            {Intl.NumberFormat().format(item.awal_tahun)}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                            }}
                        >
                            {Intl.NumberFormat().format(item.anggota_masuk)}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                            }}
                        >
                            {Intl.NumberFormat().format(item.anggota_keluar)}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                            }}
                        >
                            {Intl.NumberFormat().format(
                                item.awal_tahun +
                                    item.anggota_masuk -
                                    item.anggota_keluar
                            )}
                        </td>
                    </tr>
                ))}
                <tr>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            textAlign: "center",
                            padding: "2px 5px",
                        }}
                        colSpan={2}
                    >
                        Total
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        {Intl.NumberFormat().format(total.awal_tahun)}
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        {Intl.NumberFormat().format(total.anggota_masuk)}
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        {Intl.NumberFormat().format(total.anggota_keluar)}
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        {Intl.NumberFormat().format(total.jumlah)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default SimpananPokokExport;
