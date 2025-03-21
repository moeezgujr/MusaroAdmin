import api from "./Axios";

export const subscriptionList = async (page) => {
  try {
    const response = await api.get(
      "/subscription/list-pending?limit=10&offset=" + page
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
export const searchListSubscription = async (text) => {
  try {
    const response = await api.get(
      "/subscription/list-pending?limit=10&offset=0&search=" + text
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
export const verifyProvider = async (id, dto) => {
  try {
    const response = await api.patch("provider/verify/" + id, dto);
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

export const updateProvider = async (id, dto) => {
  try {
    const response = await api.put("provider/admin/" + id, dto, {
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
