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
export const uploadApi = async (dto) => {
  try {
    const formData = new FormData();
    formData.append("file", dto);
    const response = await api.post("/general/upload-file", formData, {
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
    const response = await api.patch("/trend/" + id, dto, {
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
export const getAllTrend = async (page) => {
  try {
    const response = await api.get("/trend/list?limit=10&offset=" + (page * 10));
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
export const searchTrend = async (text) => {
  try {
    const response = await api.get(
      "/trend/list?limit=10&offset=0&search=" + text
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
