import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableSimpananSukarela from "@/Components/Table/TableSimpananSukarela";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Sukarela = ({ auth, data, members, total }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Sukarela" />
            <Breadcrumb pageName="Simpanan Sukarela" />
            <TableSimpananSukarela
                data={data}
                members={members}
                total={total}
                type="sukarela"
            />
        </Authenticated>
    );
};

export default Sukarela;
