import api from "./Axios";

export const getCities = async (dto) => {
  try {
    const response = await api.get("general/city?limit=10&offset=0");
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
