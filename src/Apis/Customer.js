import api from "./Axios";

export const customerList = async (page) => {
  try {
    const response = await api.get(
      "/customer/list-customers?limit=10&offset=" + (page*10)
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
export const searchList = async (text) => {
  try {
    const response = await api.get(
      "/customer/list-customers?limit=10&offset=0&search=" + text
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

export const getcustomerbyid = async (text) => {
  try {
    const response = await api.get("/customer/" + text);
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
export const getProviders = async (page) => {
  try {
    const response = await api.get(
      "/provider/list-providers?limit=10&offset=" + (page*10)
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
export const searchProviders = async (text) => {
  try {
    const response = await api.get(
      "/provider/list-providers?limit=10&offset=0&search=" + text
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
export const getRatings = async (id) => {
  try {
    const response = await api.get("review/list-reviews/" + id);
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
export const deleteCustomer = async (id) => {
  try {
    const response = await api.delete("customer/delete-customer/" + id);
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
