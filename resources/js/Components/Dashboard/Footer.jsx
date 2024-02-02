import { useEffect, useState } from "react";

const Footer = ({ page }) => {
    const [position, setPosition] = useState(false);
    const [namePosition, setName] = useState("sticky");

    useEffect(() => {
        const screenHeight = window.screen.height;
        const documentHeight = document.querySelector("main").offsetHeight;
        if (documentHeight  <= 600) {
            setPosition(true);
        } else {
            setPosition(false);
        }

        // console.log(screenHeight)

        if (screenHeight > 768) {
            setName("absolute");
        } else {
            setName("sticky");
        }
    }, [page]);

    useEffect(() => {
        const screenHeight = window.screen.height;
        if (screenHeight > 768) {
            setName("absolute");
        } else {
            setName("sticky");
        }
    }, [page]);

    useEffect(() => {
        const documentHeight = document.querySelector("main").offsetHeight;
        if (documentHeight  <= 600) {
            setPosition(true);
        } else {
            setPosition(false);
        }
    });
    
    useEffect(() => {
        const screenHeight = window. screen.height;
        if (screenHeight > 768) {
            setName("absolute");
        } else {
            setName("sticky");
        }
    });

    return (
        <footer className={`absolute bottom-0 border-t border-t-bodydark w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none py-3 px-4 shadow-2 md:px-6 2xl:px-11`}>
            <div className="flex flex-col gap-1 sm:flex-row justify-between items-center w-full">
                <p className="text-xs">
                    &copy; {new Date().getFullYear()} - BPS Kabupaten Kuningan.
                </p>
                <p className="text-xs">
                    Created by{" "}
                    <a
                        href="https://smkn4kuningan.sch.id"
                        target="_blank"
                        className="underline hover:text-primary"
                    >
                        SMK Negeri 4 Kuningan
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
