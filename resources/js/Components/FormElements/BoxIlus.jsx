import ilus from "@/assets/svg/login.svg";

const BoxIlus = () => {
    return (
        <div className="basis-1/2 hidden h-screen md:flex justify-center items-center bg-primary dark:bg-boxdark">
            <div className="flex flex-col w-full justify-center items-center gap-20">
                <h1 className="text-center text-white font-extrabold text-title-xl">
                    Welcome to <br /> Koperasi Kesejahteraan
                </h1>
                <div className="w-[45%] overflow-hidden h-auto">
                    <img src={ilus} alt="illustration by undraw" loading="lazy" />
                </div>
            </div>
        </div>
    );
};

export default BoxIlus;
