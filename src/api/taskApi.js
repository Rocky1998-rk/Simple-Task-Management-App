import api from "./axios";

// ======================== Create new task ========================
export const createTask = (data) => api.post("/tasks", data);

//=========================== Get all tasks =======================
export const getTasks = () => api.get("/tasks");

// ============================= Update task ==========================
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

// ============================ Delete task =======================
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
