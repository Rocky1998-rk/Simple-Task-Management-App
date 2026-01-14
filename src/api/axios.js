import axios from "axios";

const api = axios.create({
  baseURL: "https://simple-task-management-app-backend.onrender.com/api", // backend base URL
});

// ============= Token automatically attach......
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
