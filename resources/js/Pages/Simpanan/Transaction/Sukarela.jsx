import TransactionSimpanan from "@/Components/FormElements/TransactionSimpanan";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LuArrowLeft } from "react-icons/lu";

const TransaksiSukarela = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Transaksi Simpanan Sukarela" />
            <a
                href={route("simpanan_sukarela")}
                className="bg-danger click_animation text-white py-2 px-3 rounded-md inline-block"
            >
                <LuArrowLeft />
            </a>
            <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <TransactionSimpanan
                    type="sukarela"
                    directUrl={route("simpanan_sukarela")}
                    postUrl={route("simpanan_sukarela_create")}
                />
            </div>
        </Authenticated>
    );
};

export default TransaksiSukarela;
