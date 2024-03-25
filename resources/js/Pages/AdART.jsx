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
                <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                    <SetAdArt />
                </div>
            )}
            {file && (
                <div className="rounded-md border mt-4 sm:mt-6 border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                    <div className="w-full flex sm:flex-row flex-col justify-between items-start gap-2 sm:items-center mb-3">
                        <div className="w-max">
                            <span className="inline-block capitalize text-sm text-strokedark">
                                filename
                            </span>
                            <h3 className="font-bold text-bold text-black dark:text-white">
                                {file?.filename}
                            </h3>
                        </div>
                        <div className="w-max">
                            <span className="inline-block capitalize text-sm text-strokedark">
                                Diupload Pada
                            </span>
                            <h3 className="font-bold text-bold text-black dark:text-white">
                                {new Date(file?.created_at).toLocaleDateString(
                                    "in-ID",
                                    { dateStyle: "long" }
                                )}{" "}
                                {new Date(file?.created_at).toLocaleTimeString(
                                    "en-ID",
                                    { timeStyle: "medium", hourCycle: "h24" }
                                )}
                            </h3>
                        </div>
                    </div>
                    <PreviewPDF url={"storage/" + file?.path} />
                </div>
            )}
        </Authenticated>
    );
};

export default AdART;
