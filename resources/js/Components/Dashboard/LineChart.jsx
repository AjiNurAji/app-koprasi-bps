import { lineChartOption } from "@/Libs/chartOption";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ data }) => {
    const date = new Date();
    const [state, setState] = useState({
        series: [
            {
                name: "Simpanan",
                data: data.perbulan,
            },

            {
                name: "Pinjaman",
                data: data.pinjaman_perbulan,
            },
            {
                name: "Bayar Pinjaman",
                data: data.bayar_pinjaman_perbulan
            }
        ],
    });
    return (
        <div className="col-span-12 rounded-md border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-primary">
                                Transaksi Simpanan
                            </p>
                            <p className="text-sm font-medium">
                                01.01.{date.getFullYear()} - 31.12.
                                {date.getFullYear()}
                            </p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary">
                                Transaksi Pinjaman
                            </p>
                            <p className="text-sm font-medium">
                                01.01.{date.getFullYear()} - 31.12.
                                {date.getFullYear()}
                            </p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-warning">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-warning"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-warning">
                                Bayar Pinjaman
                            </p>
                            <p className="text-sm font-medium">
                                01.01.{date.getFullYear()} - 31.12.
                                {date.getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={lineChartOption.bar}
                        series={state.series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default LineChart;
