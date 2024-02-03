import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoPower } from "react-icons/io5";
import { RiSettings4Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import UserOne from "@/assets/images/user-01.webp";
import { router } from "@inertiajs/react";

const DropdownUser = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    const logout = async (e) => {
        e.preventDefault();
        const loading = toast.loading("Loading...");
        const res = await axios.post(route("logout"));

        console.log(res);

        if (res?.status === 200) {
            toast.success(res.data.message, {
                id: loading,
                duration: 3000,
            });
            router.get(route("login"));
        }
    };

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            if (
                !dropdown.current.contains(target) ||
                !trigger.current.contains(target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div className="relative">
            <div
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 cursor-pointer"
            >
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">
                        {user.name}
                    </span>
                    <span className="block text-xs">
                        {user.role ? user.role : "anggota"}
                    </span>
                </span>

                <span className="h-12 w-12 rounded-full">
                    <img src={UserOne} alt="User" />
                </span>

                <svg
                    className={`hidden fill-current sm:block ${
                        dropdownOpen ? "rotate-180" : ""
                    }`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                        fill=""
                    />
                </svg>
            </div>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-3.5 flex w-62.5 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                    dropdownOpen === true ? "block" : "hidden"
                }`}
            >
                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                    <li>
                        <a
                            href="/profile"
                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base"
                        >
                            <CgProfile className="w-6 h-6" />
                            My Profile
                        </a>
                    </li>
                    <li>
                        <a
                            href="/settings"
                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base"
                        >
                            <RiSettings4Line className="w-6 h-6" />
                            Account Settings
                        </a>
                    </li>
                </ul>
                <button
                    onClick={logout}
                    className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-meta-1 dark:hover:text-meta-1 lg:text-base"
                >
                    <IoPower className="w-6 h-6" />
                    Log Out
                </button>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default DropdownUser;
