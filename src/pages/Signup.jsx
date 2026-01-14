import { useState } from "react";
import { signupUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT IMAGE - Task Management Theme */}
      <div className="hidden md:block w-full h-screen">
       <img
  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  alt="task-management"
  className="w-full h-full object-cover"
/>

      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-[#dddbdb88] px-6">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">Create your account</h2>
          <p className="text-gray-500 mb-6">
            Manage all your daily tasks in one place
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name 
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md outline "
                placeholder="Enter your name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md outline"
                placeholder="you@example.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md outline"
                placeholder="***********"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md cursor-pointer">
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
