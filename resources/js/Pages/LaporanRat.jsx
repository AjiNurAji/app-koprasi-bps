import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import FileList from "@/Components/FileList";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const LaporanRat = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Laporan RAT" />
            <Breadcrumb pageName="Laporan RAT" />
            <FileList data={data} />
        </Authenticated>
    )
}

export default LaporanRat;