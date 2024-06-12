import api from "./Axios";

export const addProfession = async (dto) => {
  try {
    const response = await api.post("/general/profession", dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Check if the error has a response property
    if (error.response) {
      return error.response.data;
    } else {
      return { error: error.message };
    }
  }
};
export const deleteTrend = async (id) => {
  try {
    const response = await api.delete("/trend=" + id);
    return response.data;
  } catch (error) {
    // Check if the error has a response property
    if (error.response) {
      return error.response.data;
    } else {
      return { error: error.message };
    }
  }
};
export const updateTrend = async (id, dto) => {
  try {
    const response = await api.put("/trend=" + id, dto);
    return response.data;
  } catch (error) {
    // Check if the error has a response property
    if (error.response) {
      return error.response.data;
    } else {
      return { error: error.message };
    }
  }
};
export const getAllProfession = async (page) => {
  try {
    const response = await api.get(
      `/general/professions?limit=10&offset=${page}&status=ACTIVE`
    );
    return response.data;
  } catch (error) {
    // Check if the error has a response property
    if (error.response) {
      return error.response.data;
    } else {
      return { error: error.message };
    }
  }
};
export const getProfessionsbyId = async (id) => {
  try {
    const response = await api.get("/general/profession/" + id);
    return response.data;
  } catch (error) {
    // Check if the error has a response property
    if (error.response) {
      return error.response.data;
    } else {
      return { error: error.message };
    }
  }
};
