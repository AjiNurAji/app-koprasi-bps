import FormCreateMember from "@/Components/FormElements/FormCreateMember";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LuArrowLeft } from "react-icons/lu";

const Create = ({ auth }) => (
    <Authenticated user={auth.user}>
        <Head title="Tambah Data Member" />
        <a
            href={route("members")}
            className="click_animation bg-danger text-white py-2 px-3 rounded-md inline-block"
        >
            <LuArrowLeft />
        </a>
        <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <FormCreateMember />
        </div>
    </Authenticated>
);

export default Create;
