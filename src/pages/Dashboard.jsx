import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("tasks");
  const [menuOpen, setMenuOpen] = useState(false);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10 text-blue-400">Task Manager</h2>

        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>

        <ul className="space-y-4 text-gray-300">
          <li
            onClick={() => setActiveTab("tasks")}
            className={`cursor-pointer p-2 rounded ${
              activeTab === "tasks"
                ? "bg-blue-600 text-white"
                : "hover:text-white"
            }`}
          >
            My Tasks
          </li>

          <li
            onClick={() => setActiveTab("create")}
            className={`cursor-pointer p-2 rounded ${
              activeTab === "create"
                ? "bg-blue-600 text-white"
                : "hover:text-white"
            }`}
          >
            Create New Task
          </li>

          <li className="p-2 text-gray-500 cursor-not-allowed">⚙️ Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />

        {/* Mobile Tabs */}{/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md border-t">
            <button
              onClick={() => {
                setActiveTab("tasks");
                setMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-3 hover:bg-gray-100"
            >
              My Tasks
            </button>

            <button
              onClick={() => {
                setActiveTab("create");
                setMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-3 hover:bg-gray-100"
            >
              Create Task
            </button>
          </div>
        )}

        <div className="p-6">
          {activeTab === "tasks" && (
            <>
              <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
              <div className="bg-white rounded-xl shadow p-6">
                <TaskList tasks={tasks} refresh={loadTasks} />
              </div>
            </>
          )}

          {activeTab === "create" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
              <div className="bg-white rounded-xl shadow p-6">
                <TaskForm refresh={loadTasks} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
