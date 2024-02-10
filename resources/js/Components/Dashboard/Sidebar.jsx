import { Fragment, useRef, useState, useEffect } from "react";
import Logo from "@/assets/images/dark-logo.png";
import SidebarLinkGroup from "./El/SidebarLinkGroup";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { RiHandCoinLine } from "react-icons/ri";
import { HiOutlineDocumentText, HiOutlineDocumentPlus } from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";

const Sidebar = ({ pathname, sidebarOpen, setSidebarOpen, user }) => {
    const trigger = useRef(false);
    const sidebar = useRef(false);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null
            ? false
            : storedSidebarExpanded === "true"
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = (target) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document
                .querySelector("body")
                ?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 shadow-lg flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <a href="/dashboard">
                    <img src={Logo} alt="Logo" loading="lazy" />
                </a>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden text-body hover:text-white"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="py-0 px-4 lg:px-6 2xl:py-4">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Dashboard --> */}
                            <li>
                                <a
                                    href={route("dashboard")}
                                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("dashboard") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <LuLayoutDashboard
                                        className="stroke-current"
                                        width={18}
                                        height={18}
                                    />
                                    Dashboard
                                </a>
                            </li>
                            {/* <!-- Menu Item Dashboard --> */}

                            {user.role ? (
                                <li>
                                    <a
                                        href={route("members")}
                                        className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                            pathname.includes("members") &&
                                            "bg-graydark dark:bg-meta-4"
                                        }`}
                                    >
                                        <LuUsers
                                            className="stroke-current"
                                            width={18}
                                            height={18}
                                        />
                                        Data Anggota
                                    </a>
                                </li>
                            ) : null}
                            <li>
                                {/* <!-- Menu Item kas --> */}
                                <SidebarLinkGroup
                                    activeCondition={
                                        pathname === "/kas" ||
                                        pathname.includes("kas")
                                    }
                                >
                                    {(handleClick, open) => {
                                        return (
                                            <Fragment>
                                                <a
                                                    href="/kas"
                                                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                        (pathname === "/kas" ||
                                                            pathname.includes(
                                                                "kas"
                                                            )) &&
                                                        "bg-graydark dark:bg-meta-4"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        sidebarExpanded
                                                            ? handleClick()
                                                            : setSidebarExpanded(
                                                                  true
                                                              );
                                                    }}
                                                >
                                                    <GrMoney
                                                        className="stroke-current"
                                                        width={18}
                                                        height={18}
                                                    />
                                                    Uang Kas
                                                    <svg
                                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                            open && "rotate-180"
                                                        }`}
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </a>
                                                {/* <!-- Dropdown Menu Start --> */}
                                                <div
                                                    className={`translate transform overflow-hidden ${
                                                        !open && "hidden"
                                                    }`}
                                                >
                                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                        <li>
                                                            <a
                                                                href={
                                                                    "/kas/tunai"
                                                                }
                                                                className={
                                                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                    (pathname.includes(
                                                                        "kas/tunai"
                                                                    ) &&
                                                                        "!text-white")
                                                                }
                                                            >
                                                                Tunai
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href={
                                                                    "/kas/rekening"
                                                                }
                                                                className={
                                                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                    (pathname.includes(
                                                                        "kas/rekening"
                                                                    ) &&
                                                                        "!text-white")
                                                                }
                                                            >
                                                                Rekening
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <!-- Dropdown Menu End --> */}
                                            </Fragment>
                                        );
                                    }}
                                </SidebarLinkGroup>
                                {/* <!-- Menu Item simpanan --> */}
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Menu Group --> */}
                    {user.role ? (
                        <div>
                            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                Transaksi
                            </h3>

                            <ul className="mb-6 flex flex-col gap-1.5">
                                {/* <!-- Menu Item simpanan --> */}
                                <SidebarLinkGroup
                                    activeCondition={
                                        pathname === "/simpanan" ||
                                        pathname.includes("simpanan")
                                    }
                                >
                                    {(handleClick, open) => {
                                        return (
                                            <Fragment>
                                                <a
                                                    href="/simpanan"
                                                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                        (pathname ===
                                                            "/simpanan" ||
                                                            pathname.includes(
                                                                "simpanan"
                                                            )) &&
                                                        "bg-graydark dark:bg-meta-4"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        sidebarExpanded
                                                            ? handleClick()
                                                            : setSidebarExpanded(
                                                                  true
                                                              );
                                                    }}
                                                >
                                                    <IoWalletOutline
                                                        className="stroke-current"
                                                        width={18}
                                                        height={18}
                                                    />
                                                    Simpanan
                                                    <svg
                                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                            open && "rotate-180"
                                                        }`}
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </a>
                                                {/* <!-- Dropdown Menu Start --> */}
                                                <div
                                                    className={`translate transform overflow-hidden ${
                                                        !open && "hidden"
                                                    }`}
                                                >
                                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                        <li>
                                                            <a
                                                                href={route(
                                                                    "simpanan_pokok"
                                                                )}
                                                                className={
                                                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                    (pathname.includes(
                                                                        "simpanan/pokok"
                                                                    ) &&
                                                                        "!text-white")
                                                                }
                                                            >
                                                                Simpanan Pokok
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href={route(
                                                                    "simpanan_wajib"
                                                                )}
                                                                className={
                                                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                    (pathname.includes(
                                                                        "simpanan/wajib"
                                                                    ) &&
                                                                        "!text-white")
                                                                }
                                                            >
                                                                Simpanan Wajib
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href={
                                                                    "/simpanan/sukarela"
                                                                }
                                                                className={
                                                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                    (pathname.includes(
                                                                        "simpanan/sukarela"
                                                                    ) &&
                                                                        "!text-white")
                                                                }
                                                            >
                                                                Simpanan
                                                                Sukarela
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <!-- Dropdown Menu End --> */}
                                            </Fragment>
                                        );
                                    }}
                                </SidebarLinkGroup>
                                {/* <!-- Menu Item simpanan --> */}
                                {/* <!-- Menu Item pinjaman --> */}
                                <SidebarLinkGroup
                                    activeCondition={
                                        pathname === "/pinjaman" ||
                                        pathname.includes("pinjaman")
                                    }
                                >
                                    {(handleClick, open) => {
                                        return (
                                            <Fragment>
                                                <a
                                                    href="/pinjaman"
                                                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                        (pathname ===
                                                            "/pinjaman" ||
                                                            pathname.includes(
                                                                "pinjaman"
                                                            )) &&
                                                        "bg-graydark dark:bg-meta-4"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        sidebarExpanded
                                                            ? handleClick()
                                                            : setSidebarExpanded(
                                                                  true
                                                              );
                                                    }}
                                                >
                                                    <RiHandCoinLine
                                                        className="stroke-current"
                                                        width={18}
                                                        height={18}
                                                    />
                                                    Pinjaman Anggota
                                                    <svg
                                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                            open && "rotate-180"
                                                        }`}
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </a>
                                                {/* <!-- Dropdown Menu Start --> */}
                                                <div
                                                    className={`translate transform overflow-hidden ${
                                                        !open && "hidden"
                                                    }`}
                                                >
                                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                        <li>
                                                            <a
                                                                href={
                                                                    "/pinjaman/harian"
                                                                }
                                                                className={
                                                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                    (pathname.includes(
                                                                        "pinjaman/harian"
                                                                    ) &&
                                                                        "!text-white")
                                                                }
                                                            >
                                                                Pinjaman Harian
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href={
                                                                    "/pinjaman/bulanan"
                                                                }
                                                                className={
                                                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                    (pathname.includes(
                                                                        "pinjaman/bulanan"
                                                                    ) &&
                                                                        "!text-white")
                                                                }
                                                            >
                                                                Pinjaman Bulanan
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <!-- Dropdown Menu End --> */}
                                            </Fragment>
                                        );
                                    }}
                                </SidebarLinkGroup>
                                {/* <!-- Menu Item simpanan --> */}
                            </ul>
                        </div>
                    ) : null}

                    {/* <!-- Others Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            OTHERS
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu AD/ART --> */}
                            <li>
                                <a
                                    href="/ad-art"
                                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("chart") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <HiOutlineDocumentText
                                        className="stroke-current"
                                        width={18}
                                        height={18}
                                    />
                                    AD/ART
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/laporan-rat"
                                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("chart") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <HiOutlineDocumentPlus
                                        className="stroke-current"
                                        width={18}
                                        height={18}
                                    />
                                    Laporan RAT
                                </a>
                            </li>
                            {/* <!-- Menu AD/ART --> */}
                            {/* <!-- Menu Team --> */}
                            <li>
                                <a
                                    href="/team"
                                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("chart") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <PiUsersThree
                                        className="stroke-current"
                                        width={18}
                                        height={18}
                                    />
                                    Team
                                </a>
                            </li>
                            {/* <!-- Menu Team --> */}
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
