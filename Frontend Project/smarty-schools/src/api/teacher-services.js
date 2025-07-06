import api from "@/api/interceptors";

// ====================== GET =======================
export const getTeachers = async () => {
    const response = await api.get("/teachers/getAll");
    return response;
};

export const getTeachersByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "desc"
) => {
    const response = await api.get(
        `/teachers/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getTeacherById = async (teacherId) => {
    const response = await api.get(
        `/teachers/getSavedTeacherById/${teacherId}`
    );
    return response;
};

export const getTeacherByName = async (name) => {
    const response = await api.get(`/teachers/getTeacherByName?name=${name}`);
    return response;
};
// ====================== POST ======================
export const createTeacher = async (data) => {
    const response = await api.post("/teachers/save", data);
    return response;
};

export const teacherChooseLesson = async (payload) => {
    const response = await api.post(`/teachers/chooseLesson/${payload}`);
    return response;
};

// ====================== PUT =======================
export const updateTeacher = async (teacherId, data) => {
    const response = await api.put(`/teachers/update/${teacherId}`, data);
    return response;
};

// ====================== DELETE =====================
export const deleteTeacher = async (teacherId) => {
    const response = await api.delete(`/teachers/delete/${teacherId}`);
    return response;
};

// ====================== TEACHER CHOOSE LESSON MODEL ======================
/*
{
  "lessonProgramId": [
    0
  ],
  "teacherId": 0
}
*/

// ====================== TEACHER CREATE MODEL ======================
/*
{
  "birthDay": "yyyy-MM-dd",
  "birthPlace": "string",
  "email": "string",
  "gender": "MALE",
  "isAdvisorTeacher": true,
  "lessonsIdList": [
    0
  ],
  "name": "string",
  "password": "string",
  "phoneNumber": "string",
  "ssn": "string",
  "surname": "string",
  "username": "string"
}
*/

// ====================== TEACHER UPDATE MODEL ======================
/* 
{
  "birthDay": "yyyy-MM-dd",
  "birthPlace": "string",
  "email": "string",
  "gender": "MALE",
  "isAdvisorTeacher": true,
  "lessonsIdList": [
    0
  ],
  "name": "string",
  "password": "string",
  "phoneNumber": "string",
  "ssn": "string",
  "surname": "string",
  "username": "string"
}
*/
