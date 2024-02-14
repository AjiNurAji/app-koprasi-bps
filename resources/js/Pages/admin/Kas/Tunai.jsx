import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Saldo from "@/Components/Kas/Saldo";
import TableTunai from "@/Components/Kas/Table/TableTunai";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Tunai = ({ auth, saldo }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Uang Kas Tunai" />
            <Breadcrumb pageName="Uang Kas Tunai" />
            <Saldo
            // saldoAwal={}
            // saldo={}
            />
            <TableTunai />
        </Authenticated>
    );
};

export default Tunai;
