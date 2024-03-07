import { BiEdit } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { router } from "@inertiajs/react";

const ActionTable = ({ id }) => {
    const deleteMember = async (e) => {
        const loading = toast.loading("Loading...");
        e.preventDefault();
        const response = await axios.delete(route("delete_member", id));

        if (response.data) {
            toast.success(response.data.message, {
                id: loading,
                duration: 3000,
            });
            router.get("members");
        } else {
            toast.error(response.message, { id: loading, duration: 3000 });
        }
    };

    return (
        <div className="flex justify-center items-center space-x-3.5">
            <a
                href={`${route("edit_member", id)}`}
                className="hover:text-primary text-lg"
            >
                <BiEdit />
            </a>
            <button
                className="hover:text-meta-1 text-lg"
                onClick={deleteMember}
            >
                <BsTrash3 />
            </button>
        </div>
    );
};

export default ActionTable;
