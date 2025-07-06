import api from "@/api/interceptors";

// ====================== GET ======================
export const getEducationTerms = async () => {
    const response = await api.get("/educationTerms/getAll");
    return response;
};

export const getEducationTermsByPage = async (
    page = 0,
    size = 20,
    sort = "startDate",
    type = "desc"
) => {
    return await api.get(
        `/educationTerms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};

export const getEducationTermById = async (id) => {
    const response = await api.get(`/educationTerms/${id}`);
    return response;
};

// ====================== POST ======================
export const createEducationTerm = async (payload) => {
    const response = await api.post("/educationTerms", payload);
    return response;
};

// ===================== DELETE =====================
export const deleteEducationTerm = async (id) => {
    const response = await api.delete(`/educationTerms/${id}`);
    return response;
};
