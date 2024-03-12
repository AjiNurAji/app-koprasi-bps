import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Rekap from "@/Components/Rekap";
import TableSimpananPokok from "@/Components/Table/TableSimpananPokok";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Pokok = ({ auth, data, members, total }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Pokok" />
            <Breadcrumb pageName="Simpanan Pokok" />
            <Rekap
                excel={route("simpanan_pokok_excel")}
                csv={route("simpanan_pokok_csv")}
                pdf={route("simpanan_pokok_pdf")}
                title="Simpanan Pokok"
                filename="Rekapitulasi Simpanan Pokok"
            />
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
