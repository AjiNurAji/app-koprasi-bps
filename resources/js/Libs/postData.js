import { toast } from "react-hot-toast";
import axios from "axios";

const PostData = async (url, data) => {
    const toastLoading = toast.loading("Loading...");

    try {
        const response = await axios.post(url, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (response.data) {
            toast.success(response.data.message, {
                id: toastLoading,
                duration: 3000,
            });
            return true;
        }

        toast.error(response.message, {
            id: toastLoading,
            duration: 3000,
        });
        return;
    } catch (error) {
        toast.error(error.response.data.message, {
            id: toastLoading,
            duration: 3000,
        });
        return;
    }
}

export default PostData;