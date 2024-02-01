export const tableHeader = [
    {
        name: "No",
        cell: (row, rowIndex) => rowIndex+1,
        sortable: true, 
    },
    {
        name: "Nama",
        selector: row => row.name,
        sortable: true, 
    },
    {
        name: "Email",
        selector: row => row.email,
        sortable: false, 
    },
    {
        name: "Action",
        selector: 
        sortable: false, 
    },
]