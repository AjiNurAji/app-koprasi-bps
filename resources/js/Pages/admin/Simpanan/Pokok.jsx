import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import TableSimpanan from "@/Components/Table/TableSimpanan";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Pokok = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Simpanan Pokok" />
            <Breadcrumb pageName="Simpanan Pokok" />
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
                type="Pokok"
            />
        </Authenticated>
    );
};

export default Pokok;
