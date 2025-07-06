import api from "@/api/interceptors";

// ====================== GET ======================
export const getLessonPrograms = async () => {
    const response = await api.get("/lessonPrograms/getAll");
    return response;
};

export const getLessonProgramsByPage = async (
    page = 0,
    size = 20,
    sort = "day",
    type = "asc"
) => {
    return await api.get(
        `/lessonPrograms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};

export const getLessonProgramById = async (id) => {
    const response = await api.get(`/lessonPrograms/getById/${id}`);
    return response;
};

export const getAllAssignedLessonPrograms = async () => {
    const response = await api.get("/lessonPrograms/getAllAssigned");
    return response;
};

export const getAllUnassignedLessonPrograms = async () => {
    const response = await api.get("/lessonPrograms/getAllUnassigned");
    return response;
};

export const getLessonProgramsForTeacher = async () => {
    const response = await api.get(
        "/lessonPrograms/getAllLessonProgramByTeacher"
    );
    return response;
};

export const getLessonProgramsForStudent = async () => {
    const response = await api.get(
        "/lessonPrograms/getAllLessonProgramByStudent"
    );
    return response;
};

// ====================== POST ======================
export const createLessonProgram = async (payload) => {
    const response = await api.post("/lessonPrograms/save", payload);
    return response.data;
};

// ===================== DELETE =====================
export const deleteLessonProgram = async (id) => {
    const response = await api.delete(`/lessonPrograms/delete/${id}`);
    return response.data;
};

// ====================== LESSON PROGRAMS CREATE MODEL =======================

/* 
{
  "day": "MONDAY",
  "educationTermId": 0,
  "lessonIdList": [
    0
  ],
  "startTime": "HH:mm",
  "stopTime": "HH:mm"
}
*/
