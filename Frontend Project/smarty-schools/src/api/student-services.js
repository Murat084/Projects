import api from "@/api/interceptors";

// ====================== GET ======================
export const getStudents = async () => {
    const response = await api.get("/students/getAll");
    return response;
};

export const getStudentsByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "desc"
) => {
    const response = await api.get(
        `/students/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getStudentsForAdvisor = async () => {
    const response = await api.get(`/students/getAllByAdvisor`);
    return response;
};

export const getStudentById = async (studentId) => {
    const response = await api.get(`/students/getStudentById/${studentId}`);
    return response;
};

export const getStudentsByName = async (name) => {
    const response = await api.get(`/students/getStudentByName/${name}`);
    return response;
};

// ====================== POST ======================
export const createStudent = async (data) => {
    const response = await api.post("/students/save", data);
    return response;
};

export const chooseLesson = async (data) => {
    const response = await api.post("/students/chooseLesson", data);
    return response;
};

// ====================== PUT ======================
export const updateStudent = async (studentId, data) => {
    const response = await api.put(`/students/update/${studentId}`, data);
    return response;
};

// ===================== DELETE =====================
export const deleteStudent = async (studentId) => {
    const response = await api.delete(`/students/delete/${studentId}`);
    return response;
};

// ====================== CREATE STUDENT MODEL ======================

/*
{
  "advisorTeacherId": 0,
  "birthDay": "yyyy-MM-dd",
  "birthPlace": "string",
  "email": "string",
  "fatherName": "string",
  "gender": "MALE",
  "motherName": "string",
  "name": "string",
  "password": "string",
  "phoneNumber": "string",
  "ssn": "string",
  "surname": "string",
  "username": "string"
}
*/
