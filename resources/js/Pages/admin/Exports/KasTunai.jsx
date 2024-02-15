const KasTunaiExport = ({ data, tableRef, saldo }) => {
    return (
        <table className="w-full hidden" ref={tableRef}>
            <thead>
                <tr>
                    <th
                        colSpan={5}
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Mutasi KAS TUNAI <br />
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
                    >
                        No
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Bulan
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Masuk
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Keluar
                    </th>
                    <th
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Saldo
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr style={{ height: "20px" }}>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            textAlign: "center",
                        }}
                    >
                        1
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            textAlign: "center",
                        }}
                    >
                        2
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            textAlign: "center",
                        }}
                    >
                        3
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            textAlign: "center",
                        }}
                    >
                        4
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            textAlign: "center",
                        }}
                    >
                        5
                    </td>
                </tr>
                <tr>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                            textAlign: "center",
                        }}
                    ></td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                            textAlign: "center",
                        }}
                    >
                        Saldo Awal
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                            textAlign: "center",
                        }}
                    ></td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                            textAlign: "center",
                        }}
                    ></td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                            textAlign: "center",
                        }}
                    >
                        {Intl.NumberFormat().format(saldo.saldo_awal)}
                    </td>
                </tr>
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
                                width: "20%"
                            }}
                        >
                            {item.bulan}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                                width: "20%"
                            }}
                        >
                            {Intl.NumberFormat().format(item.masuk)}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                                width: "20%"
                            }}
                        >
                            {Intl.NumberFormat().format(item.keluar)}
                        </td>
                        <td
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid",
                                padding: "2px 5px",
                                width: "20%"
                            }}
                        >
                            {Intl.NumberFormat().format(item.saldo)}
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
                    >
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        Jumlah
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        {Intl.NumberFormat().format(saldo.total_masuk)}
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        {Intl.NumberFormat().format(saldo.total_keluar)}
                    </td>
                    <td
                        style={{
                            borderCollapse: "collapse",
                            border: "1px solid",
                            padding: "2px 5px",
                        }}
                    >
                        {Intl.NumberFormat().format(saldo.jumlah)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default KasTunaiExport;
