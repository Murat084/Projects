import api from "@/api/interceptors";

// ====================== GET ======================
export const getStudentInfosByPage = async (
    page = 0,
    size = 20,
    sort = "educationTermId",
    type = "asc"
) => {
    const response = await api.get(
        `/studentInfo/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getStudentInfosById = async (infoId) => {
    const response = await api.get(`/studentInfo/get/${infoId}`);
    return response;
};

export const getStudentInfosForAdmin = async (page = 0, size = 20) => {
    const response = await api.get(
        `/studentInfo/getAllForAdmin?page=${page}&size=${size}`
    );
    return response;
};

export const getStudentInfosForTeacher = async (page = 0, size = 20) => {
    const response = await api.get(
        `/studentInfo/getAllForTeacher?page=${page}&size=${size}`
    );
    return response;
};

export const getStudentInfosForStudent = async (page = 0, size = 20) => {
    const response = await api.get(
        `/studentInfo/getAllByStudent?page=${page}&size=${size}`
    );
    return response;
};

export const getStudentInfosByIdForStudent = async (infoId) => {
    const response = await api.get(`/studentInfo/getByStudentId/${infoId}`);
    return response;
};

// ====================== POST ======================
export const createStudentInfo = async (data) => {
    const response = await api.post("/studentInfo/save", data);
    return response;
};
// ====================== PUT ======================
export const updateStudentInfo = async (infoId, data) => {
    const response = await api.put(`/studentInfo/update/${infoId}`, data);
    return response;
};
// ===================== DELETE =====================
export const deleteStudentInfo = async (infoId) => {
    const response = await api.delete(`/studentInfo/delete/${infoId}`);
    return response;
};
