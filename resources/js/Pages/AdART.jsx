import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb"
import Authenticated from "@/Layouts/AuthenticatedLayout"

const AdART = ({ auth }) => {
    return  (
        <Authenticated user={auth.user}>
            <Head title="AD/ART" />
            <Breadcrumb pageName="AD/ART" />
        </Authenticated>
    )
}

export default AdART;