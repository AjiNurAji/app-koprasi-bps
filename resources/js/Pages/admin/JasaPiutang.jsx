import CardPiutang from "@/Components/CardPiutang";
import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableJasaPiutang from "@/Components/Table/TableJasaPiutang";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const JasaPiutang = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Jasa Piutang" />
            <Breadcrumb pageName="Jasa Piutang" />
            <CardPiutang data={data} />
            <TableJasaPiutang data={data} />
        </Authenticated>
    );
};

export default JasaPiutang;
