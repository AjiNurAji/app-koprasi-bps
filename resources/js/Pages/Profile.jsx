import Breadcrumb from "@/Components/Dashboard/El/Breadcrumb";
import ProfileUpdate from "@/Components/FormElements/ProfileUpdate";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import UserOne from "@/assets/images/user.png";
import { Head } from "@inertiajs/react";

const Profile = ({ auth, data }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title={data.name} />
            <Breadcrumb pageName="Profile" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="relative z-20 h-25 md:h-45 bg-primary dark:bg-black rounded-md"></div>
                    <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                        <div className="relative z-30 mx-auto -mt-22 h-20 w-full max-w-20 rounded-full bg-white dark:bg-boxdark p-1 sm:h-44 sm:max-w-44 sm:p-3">
                            <div className="relative drop-shadow-2">
                                <img
                                    src={data.image ? data.image : UserOne}
                                    className="w-full h-full"
                                    alt={data.name}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="mb-1.5 text-2xl font-semibold capitalize text-black dark:text-white">
                                {data.name}
                            </h3>
                            <p className="font-medium">
                                {data.role ? data.role : "anggota"}
                            </p>
                        </div>
                    </div>
                </div>
                <ProfileUpdate user={data} />
            </div>
        </Authenticated>
    );
};

export default Profile;
