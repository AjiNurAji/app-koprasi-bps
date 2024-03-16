import { BsPlusLg } from "react-icons/bs";

const ButtonTambahData = ({ url }) => (
    <a
        href={url}
        className="p-2 click_animation pr-3 hover:bg-opacity-95 flex justify-center items-center gap-2 transition-all w-max duration-300 ease-in-out bg-primary text-white rounded-md text-xl"
    >
        <BsPlusLg /> <span className="text-sm">Tambah Data</span>
    </a>
);

export default ButtonTambahData;