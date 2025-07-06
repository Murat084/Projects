import api from "@/api/interceptors";

// ====================== GET ======================

export const getMeetings = async () => {
    const response = await api.get("/meet/getAll");
    return response;
};

export const getMeetingsByPage = async (
    page = 0,
    size = 20,
    sort = "day",
    type = "asc"
) => {
    const response = await api.get(
        `/meet/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getMeetingsForAdvisorTeacher = async () => {
    const response = await api.get("/meet/getAllMeetByAdvisorTeacherAsList");
    return response;
};

export const getMeetingsForAdvisorTeacherByPage = async (
    page = 0,
    size = 20
) => {
    const response = await api.get(
        `/meet/getAllMeetByAdvisorAsPage?page=${page}&size=${size}`
    );
    return response;
};

export const getMeetingsForStudent = async () => {
    const response = await api.get("/meet/getAllMeetByStudent");
    return response;
};

export const getMeetingById = async (meetingId) => {
    const response = await api.get(`/meet/getMeetById/${meetingId}`);
    return response;
};

// ====================== POST ======================
export const createMeeting = async (data) => {
    const response = await api.post("/meet/save", data);
    return response;
};

// ====================== PUT ======================
export const updateMeeting = async (meetingId, data) => {
    const response = await api.put(`/meet/update/${meetingId}`, data);
    return response;
};

// ===================== DELETE =====================
export const deleteMeeting = async (meetingId) => {
    const response = await api.delete(`/meet/delete/${meetingId}`);
    return response;
};
