import ActionButton from "@/Components/Pinjaman/ActionButton";
import ActionTable from "@/Components/Table/ActionTable";
import { createColumnHelper } from "@tanstack/react-table";
import profile from "@/assets/images/user.png";
import HapusPermanen from "@/Components/HapusPermanen";
import FileListAction from "@/Components/FileListAction";
import {
    BsFillFileEarmarkExcelFill,
    BsFillFileEarmarkFill,
    BsFillFileEarmarkImageFill,
    BsFillFileEarmarkMusicFill,
    BsFillFileEarmarkPdfFill,
    BsFillFileEarmarkPlayFill,
    BsFillFileEarmarkSlidesFill,
    BsFillFileEarmarkTextFill,
    BsFillFileEarmarkWordFill,
} from "react-icons/bs";
import { ImSvg } from "react-icons/im";

const columnHelper = createColumnHelper();

export const columnsMember = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => (
            <span className="font-medium block text-center text-black dark:text-white">
                {data.row.index + 1}
            </span>
        ),
        header: "No",
        rowSpan: 2,
    }),

    columnHelper.accessor("image", {
        cell: (data) => (
            <div className="flex justify-center items-center w-full h-full">
                <span className="block w-15 h-15 overflow-hidden rounded-full">
                    <img src={data.getValue() ? data.getValue() : profile} />
                </span>
            </div>
        ),
        header: "Foto",
        enableSorting: false,
    }),

    columnHelper.accessor("NIP", {
        id: "NIP",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "NIP",
        enableSorting: false,
    }),

    columnHelper.accessor("name", {
        id: "namaLengkap",
        cell: (data) => (
            <span className="text-black capitalize dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama Lengkap",
    }),

    columnHelper.accessor("no_hp", {
        id: "no_hp",
        cell: (data) => (
            <span className="text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "No HP",
        enableSorting: false,
    }),

    columnHelper.accessor("id_member", {
        id: "Action",
        cell: (data) => (
            <>
                {data.row.original.is_deleted ? (
                    <HapusPermanen id={data.getValue()} />
                ) : (
                    <ActionTable id={data.getValue()} />
                )}
            </>
        ),
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
            <span className="text-black capitalize dark:text-white">
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
            <span className="font-medium capitalize text-black dark:text-white">
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
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: `Awal Tahun ${new Date().getFullYear()}`,
                enableGlobalFilter: false,
            }),

            columnHelper.accessor("simpanan_pokok", {
                id: "AnggotaMasuk",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data
                            .getValue()
                            .map((r) => r.anggota_masuk)
                            .reduce((p, c) => p + c, 0)
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
                              }).format(
                                  data
                                      .getValue()
                                      .map((r) => r.anggota_masuk)
                                      .reduce((p, c) => p + c, 0)
                              )
                            : "-"}
                    </span>
                ),
                header: "Anggota Masuk",
                enableGlobalFilter: false,
            }),

            columnHelper.accessor("simpanan_pokok", {
                id: "AnggotaKeluar",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data
                            .getValue()
                            .map((r) => r.anggota_keluar)
                            .reduce((p, c) => p + c, 0)
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
                              }).format(
                                  data
                                      .getValue()
                                      .map((r) => r.anggota_keluar)
                                      .reduce((p, c) => p + c, 0)
                              )
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

    columnHelper.accessor("simpanan_pokok", {
        id: "kekayaan",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.row.original.awal_tahun +
                data
                    .getValue()
                    .map((r) => r.anggota_masuk)
                    .reduce((p, c) => p + c, 0) -
                data
                    .getValue()
                    .map((r) => r.anggota_keluar)
                    .reduce((p, c) => p + c, 0)
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
                      }).format(
                          data.row.original.awal_tahun +
                              data
                                  .getValue()
                                  .map((r) => r.anggota_masuk)
                                  .reduce((p, c) => p + c, 0) -
                              data
                                  .getValue()
                                  .map((r) => r.anggota_keluar)
                                  .reduce((p, c) => p + c, 0)
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

    columnHelper.accessor("name", {
        id: "name",
        cell: (data) => (
            <span className="font-medium capitalize text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("awal_tahun", {
        id: "awal_tahun",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
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
                {data.getValue().length
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
                      }).format(
                          data
                              .getValue()
                              .map((r) => r.simpanan_wajib)
                              .reduce((p, c) => p + c, 0) +
                              data
                                  .getValue()
                                  .map((r) => r.kekayaan_awal_tahun)
                                  .reduce((p, c) => p + c, 0)
                      )
                    : "-"}
            </span>
        ),
        header: "Simpanan Wajib",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("ambil_simpanan", {
        id: "anggota_keluar",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue().length
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
                      }).format(
                          data
                              .getValue()
                              .map((r) => r.nominal)
                              .reduce((p, c) => p + c, 0)
                      )
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
                {data.row.original.simpanan_wajib
                    .map((r) => r.simpanan_wajib)
                    .reduce((p, c) => p + c, 0) -
                data.row.original.ambil_simpanan
                    .map((r) => r.nominal)
                    .reduce((p, c) => p + c, 0)
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
                      }).format(
                          data.row.original.simpanan_wajib
                              .map((r) => r.simpanan_wajib)
                              .reduce((p, c) => p + c, 0) -
                              data.row.original.ambil_simpanan
                                  .map((r) => r.nominal)
                                  .reduce((p, c) => p + c, 0)
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

    columnHelper.accessor("name", {
        id: "Nama",
        cell: (data) => (
            <span className="font-medium capitalize text-black dark:text-white">
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
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
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
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
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
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: `Awal ${new Date().getFullYear()}`,
                enableGlobalFilter: false,
                enableSorting: false,
            }),

            columnHelper.accessor("simpanan_sukarela", {
                id: "selama_tahun",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data
                            .getValue()
                            .map((r) => r.selama_tahun)
                            .reduce((p, c) => p + c, 0)
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
                              }).format(
                                  data
                                      .getValue()
                                      .map((r) => r.selama_tahun)
                                      .reduce((p, c) => p + c, 0)
                              )
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
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
                              }).format(data.getValue())
                            : "-"}
                    </span>
                ),
                header: "Diambil",
                enableGlobalFilter: false,
                enableSorting: false,
            }),

            columnHelper.accessor("simpanan_sukarela", {
                id: "disimpan_kembali",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data
                            .getValue()
                            .map((r) => r.disimpan_kembali)
                            .reduce((p, c) => p + c, 0)
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
                              }).format(
                                  data
                                      .getValue()
                                      .map((r) => r.disimpan_kembali)
                                      .reduce((p, c) => p + c, 0)
                              )
                            : "-"}
                    </span>
                ),
                header: "Disimpan Kembali",
                enableGlobalFilter: false,
                enableSorting: false,
            }),

            columnHelper.accessor("akhir_tahun", {
                id: "akhir_taun",
                cell: (data) => (
                    <span className="font-medium text-black dark:text-white">
                        {data.getValue()
                            ? Intl.NumberFormat("en-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: "0",
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
            <span className="font-medium capitalize text-black dark:text-white">
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
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
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
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
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

    columnHelper.accessor("tanggal_transaksi", {
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
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
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
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
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
                {new Date(data.getValue()).toLocaleDateString("en-ID", {
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
            <span className="font-medium capitalize text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("pinjaman.tahun_lalu", {
        id: "sisa_tahun_lalu",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: `Sisa Pinjaman Tahun ${new Date().getFullYear() - 1}`,
    }),

    columnHelper.accessor("pinjaman.total_pinjaman", {
        id: "pinjaman",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: `Pinjaman Tahun ${new Date().getFullYear()}`,
    }),

    columnHelper.accessor("pinjaman.dibayar", {
        id: "dibayar",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                {data.getValue()
                    ? Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: "0",
                      }).format(data.getValue())
                    : "-"}
            </span>
        ),
        header: "Dibayar",
    }),

    columnHelper.accessor("pinjaman.sisa_pinjaman", {
        id: "sisa",
        cell: (data) => (
            <span className="font-medium text-black dark:text-white">
                <span className="font-medium text-black dark:text-white">
                    {data.getValue()
                        ? Intl.NumberFormat("en-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: "0",
                          }).format(data.getValue())
                        : "-"}
                </span>
            </span>
        ),
        header: "Sisa",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("pinjaman", {
        id: "status",
        cell: (data) => (
            <span className="font-medium block w-full text-black dark:text-white">
                {!data.getValue().total_pinjaman &&
                !data.getValue().sisa_pinjaman &&
                !data.getValue().tahun_lalu ? (
                    <p className="inline-block text-center w-full rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary">
                        Tidak Memiliki Pinjaman
                    </p>
                ) : data.getValue().sisa_pinjaman ? (
                    <p className="inline-block text-center w-full rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                        Belum Lunas
                    </p>
                ) : (
                    <p className="inline-block text-center w-full rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        Lunas
                    </p>
                )}
            </span>
        ),
        header: "Status",
        enableGlobalFilter: false,
    }),

    columnHelper.accessor("id_member", {
        id: "aksi",
        cell: (data) => <ActionButton id={data.getValue()} />,
        header: "Aksi",
    }),
];

export const columnFileList = [
    columnHelper.accessor("filename", {
        id: "filename",
        cell: (data) => (
            <span className="block w-max py-2 px-4 text-sm font-medium text-start text-black dark:text-white">
                <div className="flex items-center">
                    <span className="w-10 inline-block h-auto">
                        {data.row.original.mimeType.includes(
                              "svg"
                          ) ? (
                            <span className="w-full inline-block text-warning text-xl">
                                <ImSvg />
                            </span>
                        ) : data.row.original.mimeType.includes("image") ? (
                            <span className="w-full inline-block text-primary text-xl">
                                <BsFillFileEarmarkImageFill />
                            </span>
                        ) : data.row.original.mimeType.includes("sheet") ||
                          data.row.original.mimeType.includes("excel") ? (
                            <span className="w-full inline-block text-success text-xl">
                                <BsFillFileEarmarkExcelFill />
                            </span>
                        ) : data.row.original.mimeType.includes("word") ? (
                            <span className="w-full inline-block text-meta-5 text-xl">
                                <BsFillFileEarmarkWordFill />
                            </span>
                        ) : data.row.original.mimeType.includes(
                              "text/plain"
                          ) ? (
                            <span className="w-full inline-block text-primary text-xl">
                                <BsFillFileEarmarkTextFill />
                            </span>
                        ) : data.row.original.mimeType.includes("pdf") ? (
                            <span className="w-full inline-block text-danger text-xl">
                                <BsFillFileEarmarkPdfFill />
                            </span>
                        ) : data.row.original.mimeType.includes("audio") ? (
                            <span className="w-full inline-block text-primary text-xl">
                                <BsFillFileEarmarkMusicFill />
                            </span>
                        ) : data.row.original.mimeType.includes("video") ? (
                            <span className="w-full inline-block text-primary text-xl">
                                <BsFillFileEarmarkPlayFill />
                            </span>
                        ) : data.row.original.mimeType.includes(
                              "presentation"
                          ) ||
                          data.row.original.mimeType.includes("powerpoint") ? (
                            <span className="w-full inline-block text-warning text-xl">
                                <BsFillFileEarmarkSlidesFill />
                            </span>
                        ) : (
                            <span className="w-full inline-block text-primary text-xl">
                                <BsFillFileEarmarkFill />
                            </span>
                        )}
                    </span>
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis w-50 md:w-60 xl:w-90 2xl:w-100 3xl:w-full">
                        {data.getValue()}
                    </p>
                </div>
            </span>
        ),
        header: "Nama",
    }),

    columnHelper.accessor("author", {
        id: "author",
        cell: (data) => (
            <span className="block py-2 px-4 font-medium text-sm text-black dark:text-white">
                {data.getValue()}
            </span>
        ),
        header: "Diupload Oleh",
        enableSorting: false,
    }),

    columnHelper.accessor("type", {
        id: "type",
        cell: (data) => (
            <span className="block py-2 px-4 font-medium text-sm text-black dark:text-white">
                File <span className="uppercase">{data.getValue()}</span>
            </span>
        ),
        header: "Tipe",
        enableSorting: false,
    }),

    columnHelper.accessor("created_at", {
        id: "created_at",
        cell: (data) => (
            <span className="block py-2 px-4 font-medium text-sm text-black dark:text-white">
                {new Date(data.getValue()).toLocaleDateString("in-ID", {
                    dateStyle: "short",
                })}{" "}
                {new Date(data.getValue()).toLocaleTimeString("in-ID", {
                    timeStyle: "medium",
                    hourCycle: "h24",
                })}
            </span>
        ),
        header: "Tanggal Upload",
    }),

    columnHelper.accessor("id_file", {
        id: "_id",
        cell: (data) => (
            <FileListAction
                id={data.getValue()}
                path={"storage/" + data.row.original.path}
                filename={data.row.original.filename}
            />
        ),
        header: "Action",
        enableSorting: false,
    }),
];
