import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableSimpanan from "@/Components/Table/TableSimpanan";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Pokok = ({ auth, data, members, total }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Pokok" />
            <Breadcrumb pageName="Simpanan Pokok" />
            <TableSimpanan
                data={data}
                members={members}
                total={total}
                type="Pokok"
            />
        </Authenticated>
    );
};

export default Pokok;
