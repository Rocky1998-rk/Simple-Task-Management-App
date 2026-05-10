import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../api/authApi";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      toast.success("Signup successful. Now login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 md:grid-cols-2">
      <div className="hidden h-screen w-full md:block">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="task management"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center bg-slate-100 px-6 transition-colors duration-200 dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Create your account</h2>
              <p className="text-slate-500 dark:text-slate-400">
                Manage all your daily tasks in one place
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
              {isDark ? "Dark" : "Light"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 outline-none transition-colors duration-200 focus:border-green-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Enter your name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 outline-none transition-colors duration-200 focus:border-green-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="you@example.com"
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
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 outline-none transition-colors duration-200 focus:border-green-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="***********"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button className="w-full cursor-pointer rounded-md bg-green-600 py-2 text-white hover:bg-green-700">
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
