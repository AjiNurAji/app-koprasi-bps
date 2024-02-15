import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import FormSetSaldoAwal from "@/Components/Kas/FormEl/FormSetSaldoAwal";
import Saldo from "@/Components/Kas/Saldo";
import TableTunai from "@/Components/Kas/Table/TableTunai";
import CreatePopup from "@/Components/Popup/CreatePopup";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Tunai = ({ auth, data, tunai, bulan }) => {
    const [popup, setPopup] = useState(false);
    return (
        <Authenticated user={auth.user}>
            <Head title="Uang Kas Tunai" />
            <Breadcrumb pageName="Uang Kas Tunai" />
            <Saldo
                setPopup={setPopup}
                saldoAwal={data ? data.saldo_awal : null}
                saldo={data ? data.saldo : null}
            />
            <TableTunai data={tunai} saldo={data} bulan={bulan} />
            {popup ? (
                <CreatePopup
                    createName="Set Saldo Awal"
                    form={
                        <FormSetSaldoAwal
                            postUrl={route("set_saldo_awal")}
                            directUrl={route("kas_tunai")}
                            name="tunai"
                            setPopup={setPopup}
                        />
                    }
                    setPopup={setPopup}
                />
            ) : null}
        </Authenticated>
    );
};

export default Tunai;
