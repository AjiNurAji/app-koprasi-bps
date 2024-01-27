import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ProcessLogin = async (url, data) => {
    const navigate = useNavigate();
    const toastLoading = toast.loading("Loading...");

    try {
        const response = await axios.post(url, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (response.data) {
            navigate(route('dashboard'));
            return toast.success(response.data.message, {
                id: toastLoading,
                duration: 3000,
            });

        }

        return toast.error(response.message, {
            id: toastLoading,
            duration: 3000,
        });
    } catch (error) {
        return toast.error(error.response.data.message, {
            id: toastLoading,
            duration: 3000,
        });
    }
}

export default ProcessLogin;