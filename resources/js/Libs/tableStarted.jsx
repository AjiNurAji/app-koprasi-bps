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

    columnHelper.accessor("name", {
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
                        {Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(data.getValue() ? data.getValue() : 0)}
                    </span>
                ),
                header: `Awal Tahun ${new Date().getFullYear()}`,
                enableGlobalFilter: false,
            }),

            columnHelper.accessor("anggota_masuk", {
                id: "AnggotaMasuk",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(data.getValue() ? data.getValue() : 0)}
                    </span>
                ),
                header: "Anggota Masuk",
                enableGlobalFilter: false,
            }),

            columnHelper.accessor("anggota_keluar", {
                id: "AnggotaKeluar",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(data.getValue() ? data.getValue() : 0)}
                    </span>
                ),
                header: "Anggota Keluar",
                enableGlobalFilter: false,
            }),
        ],
        header: "Simpanan Pokok",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("kekayaan", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
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

    columnHelper.accessor("name", {
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
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
            </span>
        ),
        header: `Kekayaan Awal Tahun ${new Date().getFullYear()}`,
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("simpanan_wajib", {
        id: "simpanan_wajib",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
            </span>
        ),
        header: "Simpanan Wajib",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("anggota_keluar", {
        id: "anggota_keluar",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
            </span>
        ),
        header: "Anggota Keluar",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("kekayaan", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
            </span>
        ),
        header: `Kekayaan per 31 Desember ${new Date().getFullYear()}`,
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
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
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
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
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
                {new Date(data.getValue()).toLocaleDateString("id-ID", {
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
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
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
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
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
                {data.getValue()} %
            </span>
        ),
        header: "Persentase",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("created_at", {
        id: "created_at",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Dibuat pada",
        enableSorting: false,
    }),
];
