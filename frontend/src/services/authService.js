import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    motdepasse: password, // ce champ DOIT correspondre au nom utilisé dans le backend
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};



export const register = async (userData) => {
  const response = await axios.post(`http://localhost:5000/api/auth/register`, userData);
  return response.data;
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
