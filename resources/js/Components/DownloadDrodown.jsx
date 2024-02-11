import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { CSVLink } from "react-csv";

const DownloadDropdown = ({ data, tableRef, sheet, filename }) => {
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
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                className={`absolute right-0 mt-1.5 z-999 flex w-62.5 flex-col rounded-md bg-white shadow-default dark:bg-boxdark ${
                    active === true ? "block" : "hidden"
                }`}
            >
                <div className="grid grid-cols-2 gap-3 border border-stroke rounded-md px-5 py-3 dark:border-strokedark">
                    <CSVLink
                        data={data}
                        separator=","
                        filename={filename}
                        className="click_animation flex items-center py-2 px-1 rounded-md justify-start w-full gap-3.5 text-sm !border border-stroke dark:border-strokedark font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base"
                    >
                        <BsFiletypeCsv className="w-6 h-6" />
                        CSV
                    </CSVLink>
                    <DownloadTableExcel
                        filename={filename}
                        sheet={sheet}
                        currentTableRef={tableRef.current}
                    >
                        <button className="flex items-center py-2 px-1 rounded-md justify-start gap-3.5 text-sm w-full border border-stroke dark:border-strokedark font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base">
                            <SiMicrosoftexcel className="w-6 h-6" />
                            XLS
                        </button>
                    </DownloadTableExcel>
                    <button
                        className="flex items-center py-2 px-1 rounded-md justiy-start gap-3.5 text-sm border w-full border-stroke dark:border-strokedark font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white lg:text-base"
                        onClick={downloadPDF}
                    >
                        <FaRegFilePdf className="w-6 h-6" />
                        PDF
                    </button>
                </div>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default DownloadDropdown;
