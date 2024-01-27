import Card from "@/Components/Dashboard/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";

const Dashboard = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <Card total={100000000} icon={<FaMoneyBillWave />} type="Uang Kas Tunai" />
                <Card total={150000000} icon={<BsFillCreditCard2FrontFill />} type="Uang Kas Rekening" />
                <Card />
                <Card />
            </div>

            {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne />
                <ChartTwo />
                <ChartThree />
                <MapOne />
                <div className="col-span-12 xl:col-span-8">
                    <TableOne />
                </div>
                <ChatCard />
            </div> */}
        </AuthenticatedLayout>
    );
};

export default Dashboard;
