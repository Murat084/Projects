import api from "@/api/interceptors";

export const login = async (data) => {
    const response = await api.post("/auth/login", data);
    return response;
};

export const getCurrentUser = async () => {
    const response = await api.get("/user/me");
    return response;
};
