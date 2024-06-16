import api from "./Axios";

export const login = async (dto) => {
  try {
    const response = await api.post("/auth/login", dto);
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
export const resetPassword = async (dto) => {
  try {
    const response = await api.patch("/auth/reset-password", dto);
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
export const forgetPassword = async (dto) => {
  try {
    const response = await api.post("/auth/forgot-password", dto);
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
