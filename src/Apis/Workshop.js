import api from "./Axios";

export const addWorkshop = async (dto) => {
  try {
    const response = await api.post("/workshop", dto);
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
export const getWorkshopList = async (page) => {
  try {
    const response = await api.get(
      "/workshop/list?limit=10&offset=" + (page * 10)
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
export const getWorkshop = async (id) => {
  try {
    const response = await api.get("/workshop/" + id);
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
export const verifyWorkshop = async (id, dto) => {
  try {
    const response = await api.put("/workshop/" + id, dto);
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
