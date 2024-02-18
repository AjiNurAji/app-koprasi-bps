import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import CardRekening from "@/Components/Kas/CardRekening";
import FormSetSaldoAwal from "@/Components/Kas/FormEl/FormSetSaldoAwal";
import Saldo from "@/Components/Kas/Saldo";
import CreatePopup from "@/Components/Popup/CreatePopup";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Rekening = ({ auth, data, rekening, bulan }) => {
    const [popup, setPopup] = useState(false);
    return (
        <Authenticated user={auth.user}>
            <Head title="Uang Kas Rekening" />
            <Breadcrumb pageName="Uang Kas Rekening" />
            <Saldo
                setPopup={setPopup}
                saldoAwal={data ? data.saldo_awal : null}
                saldo={data ? data.saldo : null}
            />
            <div className="mt-4 md:mt-6">
                <CardRekening
                    data={rekening}
                    user={auth.user}
                    saldo={data}
                    bulan={bulan}
                    setPopup={setPopup}
                />
            </div>
            {popup ? (
                <CreatePopup
                    createName="Set Saldo Awal"
                    form={
                        <FormSetSaldoAwal
                            postUrl={route("set_saldo_awal")}
                            directUrl={route("kas_rekening")}
                            name="rekening"
                            setPopup={setPopup}
                        />
                    }
                    setPopup={setPopup}
                />
            ) : null}
        </Authenticated>
    );
};

export default Rekening;
