import api from "@/api/interceptors";

// ====================== GET ======================
export const getLessons = async () => {
    const response = await api.get("/lessons/getAll");
    return response;
};

export const getLessonsByPage = async (
    page = 0,
    size = 20,
    sort = "lessonName",
    type = "asc"
) => {
    return await api.get(
        `/lessons/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};

export const getLessonByName = async (name) => {
    const response = await api.get(`/lessons/getLessonByName/${name}`);
    return response;
};

export const getLessonById = async (id) => {
    const response = await api.get(`/lessons/getAllLessonByLessonId/${id}`);
    return response;
};

// ====================== POST ======================
export const createLesson = async (payload) => {
    const response = await api.post("/lessons/save", payload);
    return response;
};

// ===================== DELETE =====================
export const deleteLesson = async (id) => {
    const response = await api.delete(`/lessons/delete/${id}`);
    return response;
};
