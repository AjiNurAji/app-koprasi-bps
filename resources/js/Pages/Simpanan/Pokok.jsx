import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableSimpananPokok from "@/Components/Table/TableSimpananPokok";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Pokok = ({ auth, data, members, total }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Pokok" />
            <Breadcrumb pageName="Simpanan Pokok" />
            <TableSimpananPokok
                data={data}
                members={members}
                total={total}
                type="pokok"
            />
        </Authenticated>
    );
};

export default Pokok;
