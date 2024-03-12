import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Rekap from "@/Components/Rekap";
import TableSimpananSukarela from "@/Components/Table/TableSimpananSukarela";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Sukarela = ({ auth, data, total }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Sukarela" />
            <Breadcrumb pageName="Simpanan Sukarela" />
            <Rekap
                excel={route("simpanan_sukarela_excel")}
                csv={route("simpanan_sukarela_csv")}
                pdf={route("simpanan_sukarela_pdf")}
                title="Simpanan Sukarela"
                filename="Rekapitulasi Simpanan Sukarela"
            />
            <TableSimpananSukarela
                data={data}
                total={total}
                type="sukarela"
            />
        </Authenticated>
    );
};

export default Sukarela;
