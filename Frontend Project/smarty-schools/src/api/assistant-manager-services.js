import api from "@/api/interceptors";

// ====================== GET ======================
export const getViceDeans = async () => {
    const response = await api.get("/vicedean/getAll");
    return response;
};

export const getViceDeansByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "desc"
) => {
    const response = await api.get(
        `/vicedean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getViceDeanById = async (viceDeanId) => {
    const response = await api.get(`/vicedean/getViceDeanById/${viceDeanId}`);
    return response;
};

// ====================== POST ======================
export const createViceDean = async (data) => {
    const response = await api.post("/vicedean/save", data);
    return response;
};

// ====================== PUT ======================
export const updateViceDean = async (viceDeanId, data) => {
    const response = await api.put(`/vicedean/update/${viceDeanId}`, data);
    return response;
};

// ===================== DELETE =====================
export const deleteViceDean = async (viceDeanId) => {
    const response = await api.delete(`/vicedean/delete/${viceDeanId}`);
    return response;
};
