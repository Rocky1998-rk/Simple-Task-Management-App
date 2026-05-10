import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data);
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 md:grid-cols-2">
      <div className="hidden h-screen w-full md:block">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="man working on laptop"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center bg-slate-100 px-6 transition-colors duration-200 dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Welcome back</h2>
              <p className="text-slate-500 dark:text-slate-400">
                Login to manage your tasks
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
              {isDark ? "Dark" : "Light"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 outline-none transition-colors duration-200 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="*********"
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 outline-none transition-colors duration-200 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
