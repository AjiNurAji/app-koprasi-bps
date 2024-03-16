import FormJasaAnggota from "@/Components/FormElements/FromJasaAnggota";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LuArrowLeft } from "react-icons/lu";

const CreateJasaPiutang = ({ auth }) => (
    <Authenticated user={auth.user}>
        <Head title="Tambah Data Jasa Anggota" />
        <a
            href={route("jasa_piutang")}
            className="bg-danger click_animation text-white py-2 px-3 rounded-md inline-block"
        >
            <LuArrowLeft />
        </a>
        <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <FormJasaAnggota />
        </div>
    </Authenticated>
);

export default CreateJasaPiutang;
