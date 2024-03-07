import TransactionSimpanan from "@/Components/FormElements/TransactionSimpanan";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LuArrowLeft } from "react-icons/lu";

const TransaksiPokok = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Transaksi Simpanan Pokok" />
            <a
                href={route("simpanan_pokok")}
                className="bg-danger click_animation text-white py-2 px-3 rounded-md inline-block"
            >
                <LuArrowLeft />
            </a>
            <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <TransactionSimpanan
                    type="pokok"
                    directUrl={route("simpanan_pokok")}
                    postUrl={route("simpanan_pokok_create")}
                />
            </div>
        </Authenticated>
    );
};

export default TransaksiPokok;
