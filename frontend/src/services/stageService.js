// stageService.js
import axios from "axios";
const API_URL = "http://localhost:5000/api";

export const getStages = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/stages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
