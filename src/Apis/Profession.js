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
export const deleteProfession = async (id) => {
  try {
    const response = await api.delete("/general/profession/" + id);
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
export const updateProfession = async (id, dto) => {
  try {
    const response = await api.patch("/general/profession/" + id, dto, {
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
export const updateProfessionOrder = async (dto) => {
  try {
    const response = await api.patch("/general/professions/order", dto);
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
    const response = await api.get(`/general/professions?status=ACTIVE`);
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
export const searchProfession = async (text) => {
  try {
    const response = await api.get(
      `/general/professions?limit=10&offset=${0}&status=ACTIVE&search=${text}`
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
