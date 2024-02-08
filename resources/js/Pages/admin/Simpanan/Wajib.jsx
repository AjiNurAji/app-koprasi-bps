import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableSimpanan from "@/Components/Table/TableSimpanan";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Wajib = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Wajib" />
            <Breadcrumb pageName="Simpanan Wajib" />
            <TableSimpanan
                data={[
                    {
                        id: 1,
                        name: "Aji Nur Aji",
                        awalTahun: 50000,
                        anggotaMasuk: null,
                        anggkotaKeluar: null,
                    },
                    {
                        id: 2,
                        name: "Tia Niandari",
                        awalTahun: 50000,
                        anggotaMasuk: null,
                        anggkotaKeluar: null,
                    },
                ]}
                type="Wajib"
            />
        </Authenticated>
    );
};

export default Wajib;
