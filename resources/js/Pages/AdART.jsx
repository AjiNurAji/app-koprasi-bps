import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import SetAdArt from "@/Components/FormElements/SetAdArt";
import PreviewPDF from "@/Components/PreviewPDF";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const AdART = ({ auth, file }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="AD/ART" />
            <Breadcrumb pageName="AD/ART" />
            {auth.user.role && (
                <SetAdArt />
            )}
            <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <PreviewPDF url={"storage/" + file.path} />
            </div>
        </Authenticated>
    );
};

export default AdART;
