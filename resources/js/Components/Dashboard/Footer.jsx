const Footer = () => {
    return (
        <footer className="absolute border-t border-t-bodydark bottom-0 w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none py-3 px-4 shadow-2 md:px-6 2xl:px-11">
            <div className="flex justify-between items-center w-full">
                <p className="text-xs">&copy; {new Date().getFullYear()} - BPS Kabupaten Kuningan.</p>
                <p className="text-xs">Created by <a href="https://smkn4kuningan.sch.id" target="_blank" className="underline hover:text-primary">SMK Negeri 4 Kuningan</a></p>
            </div>
        </footer>
    )
}

export default Footer;