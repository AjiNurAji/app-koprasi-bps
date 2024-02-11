import { barChartOption } from "@/Libs/chartOption";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ data }) => {

    const [state, setState] = useState({
        series: [
            {
                name: "Simpanan",
                data: data.simpanan,
            },
            {
                name: "Pinjaman",
                data: [400000, 23, 20, 8, 13, 27, 15],
            },
        ],
    });

    console.log(state.series[0].data);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="mb-4 justify-between gap-4 sm:flex">
                <div>
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Transaksi minggu ini
                    </h4>
                </div>
            </div>

            <div>
                <div id="chartTwo" className="-ml-5 -mb-9">
                    <ReactApexChart
                        options={barChartOption}
                        series={state.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default BarChart;
