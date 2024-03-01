export const lineChartOption = {
    bar: {
        legend: {
            show: false,
            position: "top",
            horizontalAlign: "left",
        },
        colors: ["#3C50E0", "#80CAEE"],
        chart: {
            fontFamily: "Satoshi, sans-serif",
            height: 335,
            type: "area",
            dropShadow: {
                enabled: true,
                color: "#623CEA14",
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },

            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: "straight",
        },
        // labels: {
        //   show: true,
        //   position: "top",
        // },
        grid: {
            borderColor: "#E2E8F0",
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 4,
            colors: "#fff",
            strokeColors: ["#3056D3", "#80CAEE"],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: "category",
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "Mei",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Okt",
                "Nov",
                "Des",
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "current-fill",
                    cssClass: "fill-black dark:fill-white",
                },
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: "0px",
                },
            },
            min: 0,
            max: 100,
            labels: {
                style: {
                    colors: "current-fill",
                    cssClass: "fill-black dark:fill-white",
                },
                formatter: (val, index) =>
                    Intl.NumberFormat("in-ID").format(val),
            },
        },
    },
};

export const barChartOption = {
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "bar",
        height: 335,
        stacked: false,
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },

    responsive: [
        {
            breakpoint: 1536,
            options: {
                plotOptions: {
                    bar: {
                        borderRadius: 0,
                        columnWidth: "70%",
                    },
                },
            },
        },
    ],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: "70%",
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "last",
        },
    },
    dataLabels: {
        enabled: false,
    },

    xaxis: {
        categories: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
        ],
        labels: {
            style: {
                colors: "current-fill",
                cssClass: "fill-black dark:fill-white",
            },
        },
    },

    yaxis: {
        labels: {
            style: {
                colors: "current-fill",
                cssClass: "fill-black dark:fill-white",
            },
            formatter: (val, index) =>
                Intl.NumberFormat("in-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(val),
        },
    },
    legend: {
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Satoshi",
        fontWeight: 500,
        fontSize: "14px",
        labels: {
            colors: "current-color",
        },

        markers: {
            radius: 99,
        },
    },
    fill: {
        opacity: 1,
    },
};
