import ActionTable from "@/Components/ActionTable";

export const tableHeader = [
    {
        name: "No",
        selector: (row) => row.id_member,
        cell: (row, rowIndex) => rowIndex + 1,
        sortable: true,
    },
    {
        name: "Nama",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: false,
    },
    {
        name: "Action",
        cell: (row) => (<ActionTable memberId={row.id_member} />),
        sortable: false,
    },
];


export const paginationComponentOptions = {
	rowsPerPageText: 'Jumlah Persatu Halaman',
	rangeSeparatorText: 'dari',
	selectAllRowsItem: true,
	selectAllRowsItemText: 'Semua',
};