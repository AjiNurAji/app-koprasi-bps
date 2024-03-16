import FormKasTunai from "@/Components/FormElements/FormKasTunai";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { LuArrowLeft } from "react-icons/lu";
import { Head } from "@inertiajs/react";

const CreateTunai = ({ auth, bulan, saldo }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Tambah Kas Rekning" />
            <a
                href={route("kas_rekening")}
                className="bg-danger click_animation text-white py-2 px-3 rounded-md inline-block"
            >
                <LuArrowLeft />
            </a>
            <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <FormKasTunai bulan={bulan} saldo={saldo} />
            </div>
        </Authenticated>
    )
}

export default CreateTunai;