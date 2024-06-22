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
export const subscriptionCustomerGraph = async (type, time, cityA, cityB) => {
  try {
    const response = await api.get(
      `/admin/analytics/customer-subscription-graph?type=${type}&cityA=${cityA}&cityB=${cityB}&option=${time.toUpperCase()}`
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

export const signupAnalytics = async (time, city) => {
  try {
    const response = await api.get(
      "/admin/analytics/new-signup-graph?option=" + time + "&city=" + city
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
      "/admin/analytics/traffic-metrics-graph?option=" + time + "&city=" + city
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
