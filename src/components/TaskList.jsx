import { useState } from "react";
import { updateTask, deleteTask } from "../api/taskApi";
import { toast } from "react-toastify";

const TaskList = ({ tasks, refresh }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Toggle task status
  const toggleStatus = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    await updateTask(task._id, { status: newStatus });
    refresh();
  };

  // Delete task
  const deleteTaskHandler = async (id) => {
  try {
    await deleteTask(id);
    toast.success("Task deleted successfully!");
    refresh();
  } catch (err) {
    toast.error(err.response?.data?.message || "Error deleting task!");
  }
};

  // Open edit popup
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Save edited data
  const saveEdit = async () => {
  try {
    await updateTask(editingTask._id, {
      title: editTitle,
      description: editDescription
    });
    toast.success("Task updated successfully!");
    setEditingTask(null);
    refresh();
  } catch (err) {
    toast.error(err.response?.data?.message || "Error updating task!");
  }
};

  return (
    <div className="relative">
      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col h-full relative"
          >
            {/* Status Badge */}
            <span
              className={`absolute top-0 right-3 text-xs px-3 py-1 rounded-full ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.status}
            </span>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
              {task.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {task.description}
            </p>

            {/* Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-auto">
              <button
                onClick={() => toggleStatus(task)}
                className={`px-1 py-2 rounded-lg text-[12px] text-white ${
                  task.status === "Completed"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {task.status === "Completed" ? "Pending" : "Complete"}
              </button>

              <button
                onClick={() => openEditModal(task)}
                className="px-3 py-2 rounded-lg text-sm bg-blue-500 hover:bg-blue-600 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTaskHandler(task._id)}
                className="px-3 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Title"
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
              rows="4"
              placeholder="Description"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
