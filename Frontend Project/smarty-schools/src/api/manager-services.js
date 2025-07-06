import api from "@/api/interceptors";

// ====================== GET ======================
export const getDeans = async () => {
    const response = await api.get("/dean/getAll");
    return response;
};

export const getDeansByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "desc"
) => {
    const response = await api.get(
        `/dean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getDeanById = async (deanId) => {
    const response = await api.get(`/dean/getManagerById/${deanId}`);
    return response;
};

// ====================== POST ======================
export const createDean = async (data) => {
    const response = await api.post("/dean/save", data);
    return response;
};

// ====================== PUT ======================
export const updateDean = async (deanId, data) => {
    const response = await api.put(`/dean/update/${deanId}`, data);
    return response;
};
// ===================== DELETE =====================
export const deleteDean = async (deanId) => {
    const response = await api.delete(`/dean/delete/${deanId}`);
    return response;
};

// ====================== CREATE DEAN MODEL ======================
/* 
{
  "birthDay": "yyyy-MM-dd",
  "birthPlace": "string",
  "gender": "MALE",
  "name": "string",
  "password": "string",
  "phoneNumber": "string",
  "ssn": "string",
  "surname": "string",
  "username": "string"
}
*/

// ====================== UPDATE DEAN MODEL ======================

/*
{
  "birthDay": "yyyy-MM-dd",
  "birthPlace": "string",
  "gender": "MALE",
  "name": "string",
  "password": "string",
  "phoneNumber": "string",
  "ssn": "string",
  "surname": "string",
  "username": "string"
}
*/
