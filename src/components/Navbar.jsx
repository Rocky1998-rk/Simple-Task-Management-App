import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">
          TM
        </div>
        <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
      </div>

      {/* Right - User */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 font-medium">
          Hi, <span className="text-gray-800">{user?.name}</span>
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
