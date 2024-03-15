import FormSetSaldoAwal from "@/Components/Kas/FormEl/FormSetSaldoAwal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "react-hot-toast";
import { router } from "@inertiajs/react";

const SaldoAwal = ({ auth, name, postUrl, directUrl, message }) => {

    if (message) {
        toast.error(message, { duration: 3000 });
        return router.get(directUrl)
    }

    return (
        <Authenticated user={auth.user}>
            <Head title="Tambah Kas Rekning" />
            <a
                href={directUrl}
                className="bg-danger click_animation text-white py-2 px-3 rounded-md inline-block"
            >
                <LuArrowLeft />
            </a>
            <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <FormSetSaldoAwal 
                    name={name}
                    postUrl={postUrl}
                    directUrl={directUrl}
                />
            </div>
        </Authenticated>
    )
}

export default SaldoAwal;