import Card from "@/Components/Dashboard/Card";
import { Head } from "@inertiajs/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiWallet, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LineChart from "@/Components/Dashboard/LineChart";
import BarChart from "@/Components/Dashboard/BarChart";

const Dashboard = ({ auth, chart, cards }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Dashboard" />

            <div className="flex  gap-4 flex-col md:flex-row md:gap-6 flex-wrap">
                <Card
                    user={auth.user}
                    total={cards.kas_tunai}
                    icon={<FaMoneyBillWave />}
                    type="Uang Kas Tunai"
                    view={route("kas_tunai")}
                />
                <Card
                    user={auth.user}
                    total={cards.kas_rekening}
                    icon={<BsFillCreditCard2FrontFill />}
                    type="Uang Kas Rekening"
                    view={route('kas_rekening')}
                />
                <Card
                    user={auth.user}
                    total={cards.simpananPokok}
                    icon={<GiWallet />}
                    type="Simpanan Pokok"
                    view={route("simpanan_pokok")}
                />
                <Card
                    user={auth.user}
                    total={cards.simpananWajib}
                    icon={<GiPayMoney />}
                    type="Simpanan Wajib"
                    view={route("simpanan_wajib")}
                />
                <Card
                    user={auth.user}
                    total={78882173}
                    icon={<GiReceiveMoney />}
                    type="Simpanan Sukarela"
                />
            </div>

            {auth.user.role ? (
                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    <LineChart data={chart} />
                    <BarChart data={chart} />
                </div>
            ) : null}
        </Authenticated>
    );
};

export default Dashboard;
