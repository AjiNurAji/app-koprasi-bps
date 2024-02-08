import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableMember from "@/Components/Table/TableMember";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Members = ({ auth, members }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Data Anggota" />
            <Breadcrumb pageName="Data Anggota" />
            <TableMember data={members}/>
        </Authenticated>
    )
}

export default Members;