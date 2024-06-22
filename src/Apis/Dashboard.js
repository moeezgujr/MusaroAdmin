import api from "./Axios";

export const totalCountApi = async () => {
  try {
    const response = await api.get("/admin/analytics/total-count");
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

export const signupAnalytics = async (time, city) => {
  try {
    const response = await api.get(
      "/admin/analytics/new-signup-graph?option=" +
        time +
        "&city=" +
        city
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
export const subscriptionAnalytics = async (time) => {
  try {
    const response = await api.get(
      `/admin/analytics/new-subscription-graph?option=${time}`
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
export const trefficMetricAnalytics = async (time, city) => {
  try {
    const response = await api.get(
      "/admin/analytics/traffic-metrics-graph?&startDate=2024-03-01T00%3A00%3A00.000Z&endDate=2024-03-01T00%3A00%3A00.000Z&option=" +
        time +
        "&city=" +
        city
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
