import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    // <div className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">

    //   {/* Left - Logo */}
    //   <div className="flex items-center gap-3">
    //     <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">
    //       TM
    //     </div>
    //     <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
    //   </div>

    //   {/* Right - User */}
    //   <div className="flex items-center gap-4">
    //     <span className="text-gray-600 font-medium">
    //       Hi, <span className="text-gray-800">{user?.name}</span>
    //     </span>

    //     <button
    //       onClick={logout}
    //       className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
    //     >
    //       Logout
    //     </button>
    //   </div>
    // </div>

    <div className="hidden md:flex bg-white shadow px-6 py-3 justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-full font-bold">
          TM
        </div>
        <h2 className="text-lg font-semibold">Task Manager</h2>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-gray-600">
          Hi, <span className="font-semibold">{user?.name}</span>
        </p>
        <Link to={"/login"}>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
