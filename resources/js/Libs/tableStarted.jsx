import ActionButton from "@/Components/Pinjaman/ActionButton";
import ActionTable from "@/Components/Table/ActionTable";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columnsMember = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
        rowSpan: 2,
    }),

    columnHelper.accessor("username", {
        id: "username",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Username",
    }),

    columnHelper.accessor("name", {
        id: "namaLengkap",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama Lengkap",
    }),

    columnHelper.accessor("email", {
        id: "email",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Alamat Email",
        enableSorting: false,
    }),

    columnHelper.accessor("id_member", {
        id: "Action",
        cell: (data) => <ActionTable id={data.getValue()} />,
        header: "Aksi",
        enableSorting: false,
        enableGlobalFilter: false,
    }),
];

export const columnAdmin = [
    columnHelper.accessor("", {
        id: "no",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
    }),

    columnHelper.accessor("username", {
        id: "username",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Username",
    }),

    columnHelper.accessor("name", {
        id: "name",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama Admin",
    }),

    columnHelper.accessor("id", {
        id: "Action",
        cell: (data) => <ActionTable id={data.getValue()} />,
        header: "Aksi",
        enableSorting: false,
        enableGlobalFilter: false,
    }),
];

export const columnsSimpananPokok = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
        rowSpan: 2,
    }),

    columnHelper.accessor("member.name", {
        id: "Nama",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("", {
        id: "group",
        colSpan: 3,
        columns: [
            columnHelper.accessor("awal_tahun", {
                id: `Awal Tahun ${new Date().getFullYear()}`,
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: `Awal Tahun ${new Date().getFullYear()}`,
                enableGlobalFilter: false,
            }),

            columnHelper.accessor("anggota_masuk", {
                id: "AnggotaMasuk",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: "Anggota Masuk",
                enableGlobalFilter: false,
            }),

            columnHelper.accessor("anggota_keluar", {
                id: "AnggotaKeluar",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: "Anggota Keluar",
                enableGlobalFilter: false,
            }),
        ],
        header: "Simpanan Pokok",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.original.awal_tahun ||
                data.row.original.anggota_masuk ||
                data.row.original.anggota_keluar
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(
                          data.row.original.awal_tahun +
                              data.row.original.anggota_masuk -
                              data.row.original.anggota_keluar
                      )
                    : "-"}
            </span>
        ),
        header: `Kekayaan per 31 Desember ${new Date().getFullYear()}`,
        enableGlobalFilter: false,
    }),
];

export const columnSimpananWajib = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("member.name", {
        id: "name",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("kekayaan_awal_tahun", {
        id: "kekayaan_awal_tahun",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: `Kekayaan Awal Tahun ${new Date().getFullYear()}`,
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("simpanan_wajib", {
        id: "simpanan_wajib",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Simpanan Wajib",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("anggota_keluar", {
        id: "anggota_keluar",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Anggota Keluar",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("kekayaan", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.original.kekayaan_awal_tahun ||
                data.row.original.simpanan_wajib ||
                data.row.original.anggota_keluar
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(
                          data.row.original.kekayaan_awal_tahun +
                              data.row.original.simpanan_wajib -
                              data.row.original.anggota_keluar
                      )
                    : "-"}
            </span>
        ),
        header: `Kekayaan per 31 Desember ${new Date().getFullYear()}`,
        enableGlobalFilter: false,
    }),
];

export const columnsSimpananSukarela = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
        rowSpan: 2,
    }),

    columnHelper.accessor("member.name", {
        id: "Nama",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("sukarela", {
        id: "sukarela",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Sukarela Dari Pembulatan",
    }),

    columnHelper.accessor("shu", {
        id: "shu",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "SHU Yang Disimpan",
    }),

    columnHelper.accessor("", {
        id: "group",
        colSpan: 3,
        columns: [
            columnHelper.accessor("awal_tahun", {
                id: `Awal ${new Date().getFullYear()}`,
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: `Awal ${new Date().getFullYear()}`,
                enableGlobalFilter: false,
                enableSorting: false,
            }),

            columnHelper.accessor("selama_tahun", {
                id: "selama_tahun",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: `Selama Tahun ${new Date().getFullYear()}`,
                enableGlobalFilter: false,
                enableSorting: false,
            }),

            columnHelper.accessor("diambil", {
                id: "diambil",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: "Diambil",
                enableGlobalFilter: false,
                enableSorting: false,
            }),

            columnHelper.accessor("disimpan_kembali", {
                id: "disimpan_kembali",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: "Disimpan Kembali",
                enableGlobalFilter: false,
                enableSorting: false,
            }),

            columnHelper.accessor("akhir_taun", {
                id: "akhir_taun",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("in-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: `Akhir ${new Date().getFullYear()}`,
                enableGlobalFilter: false,
                enableSorting: false,
            }),
        ],
        header: "Simpanan Sukarela",
        enableGlobalFilter: false,
    }),
];

export const HistoryOptionTable = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
        enableSorting: false,
    }),

    columnHelper.accessor("name", {
        id: "name",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("nominal", {
        id: "nominal_masuk",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Nominal Masuk",
        enableSorting: false,
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("nominal_keluar", {
        id: "nominal_keluar",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Nominal Keluar",
        enableSorting: false,
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("nama_transaksi", {
        id: "nama_transaksi",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama Transaksi",
    }),

    columnHelper.accessor("type", {
        id: "type",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Jenis Transaksi",
    }),

    columnHelper.accessor("waktu", {
        id: "tanggal",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {new Date(data.getValue()).toLocaleDateString("in-ID", {
                    dateStyle: "long",
                })}
            </span>
        ),
        header: "Tanggal Transaksi",
        enableSorting: false,
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("waktu", {
        id: "waktu",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {new Date(data.getValue()).toLocaleTimeString("en-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hourCycle: "h24",
                })}
            </span>
        ),
        header: "Waktu Transaksi",
        enableSorting: false,
        enableGlobalFilter: false,
    }),
];

export const columnKasTunai = [
    columnHelper.accessor("", {
        id: "no",
        cell: (data) => (
            <span className="text-black dark:text-white text-center block">
                {data.row.index + 1}
            </span>
        ),

        header: "No",
    }),

    columnHelper.accessor("bulan", {
        id: "bulan",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Bulan",
        enableSorting: false,
    }),

    columnHelper.accessor("masuk", {
        id: "masuk",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Masuk",
        enableSorting: false,
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("keluar", {
        id: "keluar",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Keluar",
        enableSorting: false,
        enableGlobalFilter: false,
    }),
];

export const columnJasaPiutang = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
    }),

    columnHelper.accessor("persentase", {
        id: "persentase",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}%
            </span>
        ),
        header: "Persentase",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("created_at", {
        id: "created_at",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {new Date(data.getValue()).toLocaleDateString("in-ID", {
                    dateStyle: "long",
                })}
            </span>
        ),
        header: "Dibuat pada",
        enableSorting: false,
    }),
];

export const columnsPinjaman = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
        rowSpan: 2,
    }),

    columnHelper.accessor("name", {
        id: "Nama",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("total_pinjaman", {
        id: "pinjaman",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue() || data.row.original.tahun_lalu
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue() + data.row.original.tahun_lalu)
                    : "-"}
            </span>
        ),
        header: `Total Pinjaman`,
    }),

    columnHelper.accessor("dibayar", {
        id: "dibayar",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("in-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Dibayar",
    }),

    // columnHelper.accessor("", {
    //     id: "dibayar",
    //     cell: (data) => (
    //         <span className="font-medium text-black dark:text-white">
    //             {data.getValue()
    //                 ? Intl.NumberFormat("in-ID", {
    //                       style: "currency",
    //                       currency: "IDR",
    //                   }).format(data.getValue())
    //                 : "-"}
    //         </span>
    //     ),
    //     header: "Dibayar",
    // }),

    columnHelper.accessor("sisa", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue() ? (
                    <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                        Belum Lunas
                    </p>
                ) : (
                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        Lunas
                    </p>
                )}
            </span>
        ),
        header: "status",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("id_member", {
        id: "aksi",
        cell: (data) => <ActionButton id={data.getValue()} />,
        header: "Aksi",
    })
];
