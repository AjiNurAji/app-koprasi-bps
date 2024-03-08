import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Rekap from "@/Components/Rekap";
import TableSimpananWajib from "@/Components/Table/TableSimpananWajib";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Wajib = ({ auth, data, members, total }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Wajib" />
            <Breadcrumb pageName="Simpanan Wajib" />
            <Rekap
                route={route("rekap_simpanan_wajib")}
                redirect={route("simpanan_wajib")}
                title="Simpanan Wajib"
            />
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
