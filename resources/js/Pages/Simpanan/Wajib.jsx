import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableSimpananWajib from "@/Components/Table/TableSimpananWajib";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Wajib = ({ auth, data, members, total }) => {
    console.log(data)
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Wajib" />
            <Breadcrumb pageName="Simpanan Wajib" />
            <TableSimpananWajib
                data={data}
                type="wajib"
                members={members}
                total={total}
            />
        </Authenticated>
    );
};

export default Wajib;
