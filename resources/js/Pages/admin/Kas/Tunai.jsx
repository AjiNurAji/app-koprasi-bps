import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import Saldo from "@/Components/Kas/Saldo";
import TableTunai from "@/Components/Kas/Table/TableTunai";
import Rekap from "@/Components/Rekap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Tunai = ({ auth, data, tunai, bulan }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Uang Kas Tunai" />
            <Breadcrumb pageName="Uang Kas Tunai" />
            <Rekap
                pdf={route("kas_tunai_pdf")}
                csv={route("kas_tunai_csv")}
                excel={route("kas_tunai_excel")}
                title="Kas Tunai"
                filename="Mutasi Tunai Bank"
            />
            <Saldo
                param={"tunai"}
                saldoAwal={data?.saldo_awal}
                saldo={data?.saldo}
            />
            <TableTunai user={auth.user} data={tunai} saldo={data} bulan={bulan} />
        </Authenticated>
    );
};

export default Tunai;
