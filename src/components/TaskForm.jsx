import { useState } from "react";
import { createTask } from "../api/taskApi.js";
import { toast } from "react-toastify";

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
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow-lg space-y-5"
      >
       
        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-1 font-bold">Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg outline"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-1 font-bold">Task Description</label>
          <textarea
            placeholder="Enter task details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg outline"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
