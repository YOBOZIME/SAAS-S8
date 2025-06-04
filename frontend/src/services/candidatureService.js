import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const postuler = async (stageId) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await axios.post(`${API_URL}/candidatures`, {
    stageId,
    etudiantId: user.id
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
};
