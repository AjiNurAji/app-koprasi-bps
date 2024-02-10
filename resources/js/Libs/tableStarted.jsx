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
        cell: (data) => <ActionTable memberId={data.getValue()} />,
        header: "Aksi",
        enableSorting: false,
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
            }),
        ],
        header: "Simpanan Pokok",
    }),

    columnHelper.accessor("kekayaan", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
                {console.log()}
            </span>
        ),
        header: `Kekayaan per 31 Desember ${new Date().getFullYear()}`,
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
    }),

    columnHelper.accessor("kekayaan", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.getValue() ? data.getValue() : 0)}
                {console.log()}
            </span>
        ),
        header: `Kekayaan per 31 Desember ${new Date().getFullYear()}`,
    }),
];
