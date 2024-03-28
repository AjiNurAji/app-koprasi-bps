import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { router } from "@inertiajs/react";

const HapusPermanen = ({ id }) => {
    const [yesOrNo, setYesOrNo] = useState(false);

    const deleteMember = async (e) => {
        e.preventDefault();
        toast.loading(
            (t) => (
                <div className="flex flex-col items-start justify-center gap-2">
                    <span className="text-lg">
                        Yakin ingin menghapus permanen anggota ini?
                    </span>
                    <small className="text-danger text-xs">
                        * seluruh data atas nama anggota akan ikut terhapus!
                    </small>
                    <div className="flex w-full items-center justify-center gap-2">
                        <button
                            className="bg-success w-full rounded-md px-3 py-1 text-white text-sm"
                            onClick={() => {
                                setYesOrNo(true);
                                toast.dismiss(t.id);
                            }}
                        >
                            Yakin
                        </button>
                        <button
                            className="bg-danger w-full rounded-md px-3 py-1 text-white text-sm"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Batal
                        </button>
                    </div>
                </div>
            ),
            {
                icon: null,
                className: "dark:bg-boxdark dark:text-white",
            }
        );
    };

    const process = async () => {
        if (!yesOrNo) return;

        const loading = toast.loading("Loading...", {
            className: "dark:bg-boxdark dark:text-white",
        });
        const response = await axios.delete(
            route("delete_permanen_member", id)
        );

        if (response.data) {
            toast.success(response.data.message, {
                id: loading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white",
            });
            router.get("members");
        } else {
            toast.error(response.message, {
                id: loading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white",
            });
        }
    };

    useEffect(() => {
        process();
    }, [yesOrNo]);

    return (
        <div className="flex w-full justify-center items-center">
            <button
                onClick={deleteMember}
                className="flex w-max rounded-md text-white gap-1.5 py-1 px-2 justify-start items-center bg-danger text-sm"
            >
                <BiTrash /> <span>Permanen</span>
            </button>
        </div>
    );
};

export default HapusPermanen;
