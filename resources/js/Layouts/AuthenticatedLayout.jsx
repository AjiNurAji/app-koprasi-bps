import Footer from "@/Components/Dashboard/Footer";
import Header from "@/Components/Dashboard/Header";
import Sidebar from "@/Components/Dashboard/Sidebar";
import { useState } from "react";
import Loader from "@/Components/Loader";
import { usePage } from "@inertiajs/react";

const Authenticated = ({ user, children, tablePage }) => {
    const page = usePage()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = page;

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar
                    pathname={url}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div
                    className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
                    id="main"
                >
                    <Loader />
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header
                        user={user}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main id="content">
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                    <Footer page={tablePage} />
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
};

export default Authenticated;
