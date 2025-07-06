import api from "@/api/interceptors";

// ====================== GET ======================
export const getGuestUsersByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "desc"
) => {
    const response = await api.get(
        `/guestUser/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

// ====================== POST ======================
export const createGuestUser = async (data) => {
    const response = await api.post("/guestUser/register", data);
    return response;
};

// ===================== DELETE =====================
export const deleteGuestUser = async (guestUserId) => {
    const response = await api.delete(`/guestUser/delete/${guestUserId}`);
    return response;
};
