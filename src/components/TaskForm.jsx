import { useState } from "react";
import { toast } from "react-toastify";
import { createTask } from "../api/taskApi.js";

const TaskForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description });
      toast.success("Task created successfully!");
      setTitle("");
      setDescription("");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Not created task!");
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <form
        onSubmit={submitHandler}
        className="space-y-5 rounded-xl bg-white p-6 shadow-lg transition-colors duration-200 dark:bg-slate-900"
      >
        <div>
          <label className="mb-1 block font-bold text-slate-600 dark:text-slate-300">
            Task Title
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="mb-1 block font-bold text-slate-600 dark:text-slate-300">
            Task Description
          </label>
          <textarea
            placeholder="Enter task details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
