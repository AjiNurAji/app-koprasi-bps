import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import SetAdArt from "@/Components/FormElements/SetAdArt";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const AdART = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="AD/ART" />
            <Breadcrumb pageName="AD/ART" />
            {auth.user.role && (
                <SetAdArt />
            )}
        </Authenticated>
    );
};

export default AdART;
