import api from "@/api/interceptors";

// ====================== GET ======================
export const getAdmins = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "desc"
) => {
    return await api.get(
        `/admin/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};

// ====================== POST ======================
export const createAdmin = async (payload) => {
    const response = await api.post("/admin/save", payload);
    return response.data;
};

// ===================== DELETE =====================
export const deleteAdmin = async (id) => {
    const response = await api.delete(`/admin/delete/${id}`);
    return response.data;
};