import { toast } from "react-hot-toast";
import axios from "axios";

const PostData = async (url, data, content) => {
    const toastLoading = toast.loading("Loading...", {
        className: "dark:bg-boxdark dark:text-white",
    });

    try {
        const response = await axios.post(url, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": content ? content : "application/json",
            },
        });

        if (response.data) {
            toast.success(response.data.message, {
                id: toastLoading,
                duration: 3000,
                className: "dark:bg-boxdark dark:text-white",
            });
            return true;
        }

        toast.error(response.message, {
            id: toastLoading,
            duration: 3000,
            className: "dark:bg-boxdark dark:text-white",
        });
        return;
    } catch (error) {
        toast.error(error.response.data.message, {
            id: toastLoading,
            duration: 3000,
            className: "dark:bg-boxdark dark:text-white",
        });
        return;
    }
};

export default PostData;
