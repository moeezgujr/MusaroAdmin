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