import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import FileInput from "@/Components/FormElements/FileInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const AdART = ({ auth }) => {
    const { data, setData } = useForm({
        file: null,
    });
    return (
        <Authenticated user={auth.user}>
            <Head title="AD/ART" />
            <Breadcrumb pageName="AD/ART" />
            <FileInput
                label="Tambahkan file ad/art"
                fileType="PDF"
                max="200MB"
                accept=".pdf"
                name={"file"}
                data={data}
                setData={setData}
            />
        </Authenticated>
    );
};

export default AdART;
