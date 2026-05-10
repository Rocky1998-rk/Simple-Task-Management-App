import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../api/taskApi";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ProfileEdit from "../components/ProfileEdit";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("tasks");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 md:flex">
      <div className="hidden w-60 bg-slate-900 p-6 text-white md:block">
        <h2 className="mb-10 text-2xl font-bold text-blue-400">Task Manager</h2>

        <ul className="space-y-4 text-slate-300">
          <li
            onClick={() => setActiveTab("tasks")}
            className={`cursor-pointer rounded p-2 ${
              activeTab === "tasks"
                ? "bg-blue-600 text-white"
                : "hover:text-white"
            }`}
          >
            My Tasks
          </li>

          <li
            onClick={() => setActiveTab("create")}
            className={`cursor-pointer rounded p-2 ${
              activeTab === "create"
                ? "bg-blue-600 text-white"
                : "hover:text-white"
            }`}
          >
            Create New Task
          </li>

          <li
            onClick={() => setActiveTab("settings")}
            className={`cursor-pointer rounded p-2 ${
              activeTab === "settings"
                ? "bg-blue-600 text-white"
                : "hover:text-white"
            }`}
          >
            Settings
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <h2 className="text-lg font-bold text-blue-600">Task Manager</h2>

          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Hi, <span className="font-semibold">{user?.name}</span>
            </p>
            <Link to="/login">
              <button
                onClick={logout}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white"
              >
                Logout
              </button>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="text-2xl text-slate-700 dark:text-slate-100"
            >
              Menu
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-b border-slate-200 bg-white shadow dark:border-slate-800 dark:bg-slate-900 md:hidden">
            <button
              onClick={() => {
                setActiveTab("tasks");
                setMenuOpen(false);
              }}
              className="block w-full px-6 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              My Tasks
            </button>

            <button
              onClick={() => {
                setActiveTab("create");
                setMenuOpen(false);
              }}
              className="block w-full px-6 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Create New Task
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setMenuOpen(false);
              }}
              className="block w-full px-6 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Settings
            </button>
          </div>
        )}

        <Navbar />

        <div className="p-6">
          {activeTab === "tasks" && (
            <>
              <h2 className="mb-4 text-2xl font-bold">My Tasks</h2>
              <div className="rounded-xl bg-white p-6 shadow transition-colors duration-200 dark:bg-slate-900">
                <TaskList tasks={tasks} refresh={loadTasks} />
              </div>
            </>
          )}

          {activeTab === "create" && (
            <>
              <h2 className="mb-4 text-2xl font-bold">Create New Task</h2>
              <div className="rounded-xl bg-white p-6 shadow transition-colors duration-200 dark:bg-slate-900">
                <TaskForm refresh={loadTasks} />
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <>
              <h2 className="mb-4 text-2xl font-bold">Settings</h2>

              <div className="space-y-6 rounded-xl bg-white p-6 shadow transition-colors duration-200 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Dark Mode</p>
                  <button
                    onClick={toggleTheme}
                    type="button"
                    className={`rounded px-4 py-1 text-white ${
                      isDark ? "bg-green-600" : "bg-slate-500"
                    }`}
                  >
                    {isDark ? "ON" : "OFF"}
                  </button>
                </div>

                <ProfileEdit user={user} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
