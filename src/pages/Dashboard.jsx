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
//         <h2 className="text-2xl font-bold mb-10 text-blue-400">
//           Task Manager
//         </h2>

//         <ul className="space-y-4 text-gray-300">
//           <li
//             onClick={() => setActiveTab("tasks")}
//             className={`cursor-pointer p-2 rounded ${
//               activeTab === "tasks" ? "bg-blue-600 text-white" : "hover:text-white"
//             }`}
//           >
//              My Tasks
//           </li>

//           <li
//             onClick={() => setActiveTab("create")}
//             className={`cursor-pointer p-2 rounded ${
//               activeTab === "create" ? "bg-blue-600 text-white" : "hover:text-white"
//             }`}
//           >
//             Create New Task
//           </li>

//           <li className="p-2 text-gray-500 cursor-not-allowed">
//             ⚙️ Settings
//           </li>
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


import { useState } from "react";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ✅ DESKTOP SIDEBAR */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <button
          onClick={() => setActiveTab("tasks")}
          className={`block w-full text-left px-4 py-2 rounded mb-2 ${
            activeTab === "tasks" ? "bg-blue-600" : "hover:bg-slate-700"
          }`}
        >
          My Tasks
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`block w-full text-left px-4 py-2 rounded ${
            activeTab === "create" ? "bg-blue-600" : "hover:bg-slate-700"
          }`}
        >
          Create New Task
        </button>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1">

        {/* 📱 MOBILE TABS */}
        <div className="md:hidden flex justify-around bg-white shadow p-2 sticky top-0 z-10">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 rounded ${
              activeTab === "tasks"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            My Tasks
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded ${
              activeTab === "create"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Create Task
          </button>
        </div>

        {/* 📄 PAGE CONTENT */}
        <div className="p-4 sm:p-6">
          {activeTab === "tasks" && <TaskList />}
          {activeTab === "create" && <CreateTask />}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
