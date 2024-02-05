import Card from "@/Components/Dashboard/Card";
import { Head } from "@inertiajs/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiWallet, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import BarChart from "@/Components/Dashboard/BarChart";

const Dashboard = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Dashboard" />

            <div className="flex  gap-4 flex-col md:flex-row md:gap-6 flex-wrap">
                <Card total={66336032} icon={<FaMoneyBillWave />} type="Uang Kas Tunai" view={"/uangkas/tunai"} />
                <Card total={168285259} icon={<BsFillCreditCard2FrontFill />} type="Uang Kas Rekening" />
                <Card total={2150000} icon={<GiWallet />} type="Simpanan Pokok" />
                <Card total={208530000} icon={<GiPayMoney />} type="Simpanan Wajib" />
                <Card total={78882173} icon={<GiReceiveMoney />} type="Simpanan Sukarela" />
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <BarChart />
                {/* <ChartOne />
                <ChartTwo />
                <ChartThree />
                <MapOne />
                <div className="col-span-12 xl:col-span-8">
                    <TableOne />
                </div>
                <ChatCard /> */}
            </div>
        </Authenticated>
    );
};

export default Dashboard;
