import api from "./Axios";

export const cancelledSubscriptionsList = async (page, status) => {
  try {
    const response = await api.get(
      "subscription/list?limit=10&offset=" + page + "&status=" + status
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
