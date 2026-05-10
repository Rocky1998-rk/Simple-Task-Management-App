import { useState } from "react";
import { toast } from "react-toastify";
import { updateTask, deleteTask } from "../api/taskApi";

const TaskList = ({ tasks, refresh }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const toggleStatus = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    await updateTask(task._id, { status: newStatus });
    refresh();
  };

  const deleteTaskHandler = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully!");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting task!");
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = async () => {
    try {
      await updateTask(editingTask._id, {
        title: editTitle,
        description: editDescription,
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="relative flex h-full flex-col rounded-xl bg-white p-5 shadow transition hover:shadow-lg dark:bg-slate-800"
          >
            <span
              className={`absolute right-3 top-0 rounded-full px-3 py-1 text-xs ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.status}
            </span>

            <h3 className="mb-2 truncate text-lg font-bold text-slate-800 dark:text-slate-100">
              {task.title}
            </h3>

            <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
              {task.description}
            </p>

            <div className="mt-auto grid grid-cols-3 gap-2">
              <button
                onClick={() => toggleStatus(task)}
                className={`rounded-lg px-1 py-2 text-[12px] text-white ${
                  task.status === "Completed"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {task.status === "Completed" ? "Pending" : "Complete"}
              </button>

              <button
                onClick={() => openEditModal(task)}
                className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTaskHandler(task._id)}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 text-slate-900 shadow-xl dark:bg-slate-900 dark:text-slate-100">
            <h2 className="mb-4 text-lg font-bold">Edit Task</h2>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mb-3 w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Title"
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="mb-3 w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              rows="4"
              placeholder="Description"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTask(null)}
                className="rounded bg-slate-300 px-4 py-2 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="rounded bg-blue-600 px-4 py-2 text-white"
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
