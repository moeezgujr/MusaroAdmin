import api from "./Axios";

export const addTrend = async (dto) => {
  try {
    const response = await api.post("/trend", dto, {
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
    const response = await api.put("/trend?id=" + id, dto);
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
export const getAllTrend = async (page) => {
  try {
    const response = await api.get("/trend/list?limit=10&offset=" + page);
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
export const getTrendByID = async (id) => {
  try {
    const response = await api.get("/trend/" + id);
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
