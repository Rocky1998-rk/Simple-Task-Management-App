import api from "./axios";

//=============== Signup ===================
export const signupUser = (data) => api.post("/auth/signup", data);

// ==================== Login =========================
export const loginUser = (data) => api.post("/auth/login", data);
