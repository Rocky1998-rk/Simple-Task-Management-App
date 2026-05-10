import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="hidden items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          TM
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Task Manager
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-slate-600 dark:text-slate-300">
          Hi, <span className="font-semibold">{user?.name}</span>
        </p>
        <Link to="/login">
          <button
            onClick={logout}
            className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
