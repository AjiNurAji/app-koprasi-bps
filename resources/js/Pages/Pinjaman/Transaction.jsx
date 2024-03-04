import TransactionPinjaman from "@/Components/Pinjaman/TransactionPinjaman";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

const Transaction = ({ auth }) => {
    const [step, setStep] = useState(1);
    return (
        <Authenticated user={auth.user}>
            <Head title="Transaksi Pinjaman" />
            <a
                href={route("pinjaman_anggota")}
                className="bg-danger click_animation text-white py-2 px-3 rounded-md mb-3 inline-block"
            >
                <LuArrowLeft />
            </a>
            <TransactionPinjaman step={step} setStep={setStep} />
        </Authenticated>
    );
};

export default Transaction;
