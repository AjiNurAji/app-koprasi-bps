import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableAdmin from "@/Components/Table/TableAdmin";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Admin = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Data Admin" />
            <Breadcrumb pageName="Data Admin" />
            <TableAdmin data={data}/>
        </Authenticated>
    )
}

export default Admin;