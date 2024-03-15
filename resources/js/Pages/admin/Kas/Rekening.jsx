import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import CardRekening from "@/Components/Kas/CardRekening";
import Saldo from "@/Components/Kas/Saldo";
import Rekap from "@/Components/Rekap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Rekening = ({ auth, data, rekening, bulan }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Uang Kas Rekening" />
            <Breadcrumb pageName="Uang Kas Rekening" />
            <Rekap
                pdf={route("kas_rekening_pdf")}
                csv={route("kas_rekening_csv")}
                excel={route("kas_rekening_excel")}
                title="Kas Rekening"
                filename="Mutasi Rekening Bank"
            />
            <Saldo
                param={"rekening"}
                saldoAwal={data?.saldo_awal}
                saldo={data?.saldo}
            />
            <div className="mt-4 md:mt-6">
                <CardRekening
                    data={rekening}
                    user={auth.user}
                    saldo={data}
                    bulan={bulan}
                />
            </div>
        </Authenticated>
    );
};

export default Rekening;
