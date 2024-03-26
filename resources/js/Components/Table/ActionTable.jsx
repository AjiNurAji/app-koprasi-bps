import { BiEdit } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

const ActionTable = ({ id }) => {
    const [yesOrNo, setYesOrNo] = useState(false);

    const deleteMember = async (e) => {
        e.preventDefault();
        toast.loading(
            (t) => (
                <div className="flex flex-col items-center justify-start gap-2">
                    <span className="text-lg">
                        Yakin ingin menghapus anggota ini?
                    </span>
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
            }
        );
    };

    const process = async () => {
        if (!yesOrNo) return;

        const loading = toast.loading("Loading...");
        const response = await axios.delete(route("delete_member", id));

        if (response.data) {
            toast.success(response.data.message, {
                id: loading,
                duration: 3000,
            });
            setYesOrNo(false);
            router.get("members");
        } else {
            setYesOrNo(false);
            toast.error(response.message, { id: loading, duration: 3000 });
        }
    }

    useEffect(() => {
        process()
    }, [yesOrNo])

    return (
        <div className="flex justify-center items-center space-x-3.5">
            <a
                href={`${route("edit_member", id)}`}
                className="hover:text-primary click_animation text-lg"
            >
                <BiEdit />
            </a>
            <button
                className="hover:text-danger click_animation text-lg"
                onClick={deleteMember}
            >
                <BsTrash3 />
            </button>
        </div>
    );
};

export default ActionTable;
