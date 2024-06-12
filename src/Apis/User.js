import api from "./Axios";

export const userList = async (page) => {
  try {
    const response = await api.get(
      "/user-management/employees?limit=10&offset=" + page
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
export const searchUser = async (page, text) => {
  try {
    const response = await api.get(
      "/user-management/employees?limit=10&offset=" + page + "&search=" + text
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
export const addUser = async (dto) => {
  try {
    const response = await api.post("/user-management/employee", dto);
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
export const deleteUser = async (id) => {
  try {
    const response = await api.delete("/user-management/employee/" + id);
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
export const getUser = async (id) => {
  try {
    const response = await api.get("/user-management/employee/" + id);
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
export const editUser = async (id, dto) => {
  try {
    const response = await api.put("/user-management/employee/" + id, dto);
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
