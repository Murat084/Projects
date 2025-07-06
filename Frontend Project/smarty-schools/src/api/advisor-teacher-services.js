import api from "@/api/interceptors";

// ====================== GET ======================
export const getAdvisorTeachers = async () => {
    const response = await api.get("/advisorTeacher/getAll");
    return response;
};

export const getAdvisorTeachersByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "page"
) => {
    return await api.get(
        `/advisorTeacher/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};

// ====================== PUT ======================
export const updateAdvisorTeacher = async (id) => {
    const response = await api.put(`/advisorTeacher/remove-advisor/${id}`);
    return response.data;
};
