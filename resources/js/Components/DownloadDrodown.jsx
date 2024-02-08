import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";

const DownloadDropdown = () => {
    const [active, setActive] = useState(false);
    const dropdown = useRef(null);
    const trigger = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !active ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            if (
                !dropdown.current.contains(target) ||
                !trigger.current.contains(target)
            ) {
                setActive(false);
            }
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!active || keyCode !== 27) return;
            setActive(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div className="relative">
            <button
                className="w-full cursor-pointer flex items-center gap-1 rounded-md border border-primary bg-primary py-1 px-2 text-white transition hover:bg-opacity-90"
                onClick={() => setActive(!active)}
                ref={trigger}
            >
                <span className="text-lg">
                    <MdOutlineFileDownload />
                </span>{" "}
                Download
            </button>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-1.5 flex w-62.5 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                    active === true ? "block" : "hidden"
                }`}
            >
                <ul className="grid grid-cols-2 gap-3 border-b border-stroke px-5 py-3 dark:border-strokedark">
                    <li>
                        <a
                            href="/profile"
                            className="flex items-center py-2 px-1 rounded-md justify-start gap-3.5 text-sm border border-stroke dark:border-strokedark font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base"
                        >
                            <BsFiletypeCsv className="w-6 h-6" />
                            CSV
                        </a>
                    </li>
                    <li>
                        <a
                            href="/settings"
                            className="flex items-center py-2 px-1 rounded-md justiy-start gap-3.5 text-sm border border-stroke dark:border-strokedark font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base"
                        >
                            <SiMicrosoftexcel className="w-6 h-6" />
                            XLSX
                        </a>
                    </li>
                    <li>
                        <a
                            href="/settings"
                            className="flex items-center py-2 px-1 rounded-md justiy-start gap-3.5 text-sm border border-stroke dark:border-strokedark font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base"
                        >
                            <FaRegFilePdf className="w-6 h-6" />
                            PDF
                        </a>
                    </li>
                </ul>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default DownloadDropdown;
