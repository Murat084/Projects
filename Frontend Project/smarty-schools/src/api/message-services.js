import api from "@/api/interceptors";

// ====================== GET ======================
export const getMessagesByPage = async (
    page = 0,
    size = 20,
    sort = "date",
    type = "desc"
) => {
    const response = await api.get(
        `/contactMessages/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getMessageByEmail = async (
    email,
    page = 0,
    size = 20,
    sort = "date",
    type = "desc"
) => {
    const response = await api.get(
        `/contactMessages/searchByEmail?email=${email}&page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

export const getMessageBySubject = async (
    subject,
    page = 0,
    size = 20,
    sort = "date",
    type = "desc"
) => {
    const response = await api.get(
        `/contactMessages/searchBySubject?subject=${subject}&page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
    return response;
};

// ====================== POST ======================
export const createMessage = async (data) => {
    const response = await api.post("/contactMessages/save", data);
    return response;
};

// ====================== CREATE MESSAGE MODEL ======================
/*
{
  "email": "string",
  "message": "string",
  "name": "string",
  "subject": "string"
}
*/
