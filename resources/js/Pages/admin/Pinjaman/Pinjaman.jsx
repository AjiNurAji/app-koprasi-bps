import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import CardPinjaman from "@/Components/Pinjaman/CardPinjaman";
import TablePinjaman from "@/Components/Pinjaman/TablePinjaman";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Pinjaman = ({ auth, data, members }) => {
    console.log(data)
    return (
        <Authenticated user={auth.user}>
            <Head title="Pinjaman Anggota" />
            <Breadcrumb pageName="Pinjaman Anggota" />
            <CardPinjaman />
            <TablePinjaman data={data} members={members} />
        </Authenticated>
    );
};

export default Pinjaman;
