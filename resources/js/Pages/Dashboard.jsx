import Card from "@/Components/Dashboard/Card";
import { Head } from "@inertiajs/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiWallet, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Dashboard = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <Card total={100000000} icon={<FaMoneyBillWave />} type="Uang Kas Tunai" view={"/uangkas/tunai"} />
                <Card total={150000000} icon={<BsFillCreditCard2FrontFill />} type="Uang Kas Rekening" />
                <Card total={20000000} icon={<GiWallet />} type="Simpanan Pokok" />
                <Card total={10000000} icon={<GiPayMoney />} type="Simpanan Wajib" />
                <Card total={2000000} icon={<GiReceiveMoney />} type="Simpanan Sukarela" />
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
        </Authenticated>
    );
};

export default Dashboard;
