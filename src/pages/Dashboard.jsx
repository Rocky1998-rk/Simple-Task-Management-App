// import { useEffect, useState } from "react";
// import { getTasks } from "../api/taskApi";
// import Navbar from "../components/Navbar";
// import TaskForm from "../components/TaskForm";
// import TaskList from "../components/TaskList";

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [activeTab, setActiveTab] = useState("tasks");

//   const loadTasks = async () => {
//     const res = await getTasks();
//     setTasks(res.data.tasks);
//   };

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
//         <h2 className="text-2xl font-bold mb-10 text-blue-400">Task Manager</h2>

//         <ul className="space-y-4 text-gray-300">
//           <li
//             onClick={() => setActiveTab("tasks")}
//             className={`cursor-pointer p-2 rounded ${
//               activeTab === "tasks"
//                 ? "bg-blue-600 text-white"
//                 : "hover:text-white"
//             }`}
//           >
//             My Tasks
//           </li>

//           <li
//             onClick={() => setActiveTab("create")}
//             className={`cursor-pointer p-2 rounded ${
//               activeTab === "create"
//                 ? "bg-blue-600 text-white"
//                 : "hover:text-white"
//             }`}
//           >
//             Create New Task
//           </li>

//           <li className="p-2 text-gray-500 cursor-not-allowed">⚙️ Settings</li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1">
//         <Navbar />

//         <div className="p-6">
//           {activeTab === "tasks" && (
//             <>
//               <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
//               <div className="bg-white rounded-xl shadow p-6">
//                 <TaskList tasks={tasks} refresh={loadTasks} />
//               </div>
//             </>
//           )}

//           {activeTab === "create" && (
//             <>
//               <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
//               <div className="bg-white rounded-xl shadow p-6">
//                 <TaskForm refresh={loadTasks} />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useContext, useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileEdit from "../components/ProfileEdit";


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("tasks");
  const [menuOpen, setMenuOpen] = useState(false); // ✅ burger state
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 dark:text-white">
      {/* Sidebar (Desktop only) */}
      <div className="w-60 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10 text-blue-400">Task Manager</h2>

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

          <li
            onClick={() => setActiveTab("settings")}
            className={`cursor-pointer p-2 rounded ${
              activeTab === "settings"
                ? "bg-blue-600 text-white"
                : "hover:text-white"
            }`}
          >
            ⚙️ Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header with Burger */}
        <div className="md:hidden flex justify-between items-center bg-white shadow px-4 py-3">
          <h2 className="text-lg font-bold text-blue-600">Task Manager</h2>

          
          {/* Right: Logout + Hamburger */}
          <div className="flex items-center gap-3">
            <p className="text-gray-600">
              Hi, <span className="font-semibold">{user?.name}</span>
            </p>
            <Link to={"/login"}>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Burger Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow border-b">
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
              Create New Task
            </button>
          </div>
        )}

        <Navbar />

        <div className="p-6">
          {activeTab === "tasks" && (
            <>
              <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
              <div className="bg-white rounded-xl shadow p-6">
                <TaskList tasks={tasks} refresh={loadTasks} />
              </div>
            </>
          )}

          <h1 className="text-black dark:text-white">DARK MODE TEST</h1>

          {activeTab === "create" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
              <div className="bg-white rounded-xl shadow p-6">
                <TaskForm refresh={loadTasks} />
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Settings</h2>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
                {/* 🌙 Dark Mode Toggle */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Dark Mode</p>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`px-4 py-1 rounded ${
                      darkMode ? "bg-green-600" : "bg-gray-400"
                    }`}
                  >
                    {darkMode ? "ON" : "OFF"}
                  </button>
                </div>

                {/* 👤 Profile Edit */}
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
