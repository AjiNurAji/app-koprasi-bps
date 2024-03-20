import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Rekap from "@/Components/Rekap";
import TableHistory from "@/Components/Table/TableHistory";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const History = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Riwayat Transaksi" />
            <Breadcrumb pageName="Riwayat Transaksi" />
            <Rekap
                excel={route("history_excel")}
                pdf={route("history_pdf")}
                csv={route("history_csv")}
                title="Riwayat Transaksi"
                filename="Riwayat Transaksi"
            />
            <TableHistory data={data} />
        </Authenticated>
    );
};

export default History;
