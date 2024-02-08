const Footer = () => {
    return (
        <footer className={`mt-5 w-full py-3 px-4 md:px-6 2xl:px-11`}>
            <div className="flex flex-col gap-1 xsm:flex-row justify-between items-center w-full">
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
