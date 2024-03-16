import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import CardPinjaman from "@/Components/Pinjaman/CardPinjaman";
import TablePinjaman from "@/Components/Pinjaman/TablePinjaman";
import Rekap from "@/Components/Rekap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Pinjaman = ({ auth, data, cards }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Pinjaman Anggota" />
            <Breadcrumb pageName="Pinjaman Anggota" />
            <Rekap
                excel={route("pinjaman_excel")}
                csv={route("pinjaman_csv")}
                pdf={route("pinjaman_pdf")}
                title="Pinjaman Anggota"
                filename="Rekapitulasi Pinjaman Anggota"
            />
            <CardPinjaman
                jumlah={cards.total_pinjaman}
                dibayar={cards.total_dibayar}
            />
            <TablePinjaman data={data} />
        </Authenticated>
    );
};

export default Pinjaman;
