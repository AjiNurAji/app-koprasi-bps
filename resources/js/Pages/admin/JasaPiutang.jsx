import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const JasaPiutang = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Jasa Piutang" />
            <Breadcrumb pageName="Jasa Piutang" />
            {/* <TableJasaPiutang data={data} /> */}
        </Authenticated>
    );
};

export default JasaPiutang;
