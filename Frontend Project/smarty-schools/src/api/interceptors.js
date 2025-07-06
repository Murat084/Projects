import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_MY_CAMPUS_MATES_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("__smarty_schools_jwt");
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => {
        return error;
    }
);

export default api;
