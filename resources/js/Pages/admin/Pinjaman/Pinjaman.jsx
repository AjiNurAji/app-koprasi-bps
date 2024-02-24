import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Pinjaman = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Pinjaman Anggota" />
            <Breadcrumb pageName="Pinjaman Anggota" />
            {/* <TablePinjaman data={data} /> */}
        </Authenticated>
    );
};

export default Pinjaman;
