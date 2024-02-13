import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableHistory from "@/Components/Table/TableHistory";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const History = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="History" />
            <Breadcrumb pageName="History Transaksi" />
            <TableHistory data={data} />
        </Authenticated>
    );
};

export default History;
