import ActionTable from "@/Components/Table/ActionTable";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.accessor("", {
        id: "No",
        cell: (data) => <span className="font-medium text-black dark:text-white">{data.row.index + 1}</span>,
        header: "No",
    }),

    columnHelper.accessor("name", {
        id: "namaLengkap",
        cell: (data) => <span className="text-black dark:text-white">{data.getValue()}</span>,
        header: "Nama Lengkap",
    }),

    columnHelper.accessor("email", {
        id: "email",
        cell: (data) => <span className="text-black dark:text-white">{data.getValue()}</span>,
        header: "Alamat Email",
    }),

    columnHelper.accessor("id_member", {
        id: "Action",
        cell: (data) => <ActionTable memberId={data.getValue()} />,
        header: "Aksi"
    })
];
