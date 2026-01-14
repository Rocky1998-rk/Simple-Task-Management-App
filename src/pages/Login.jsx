import { useContext, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="hidden md:block w-full h-screen">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="man working on laptop"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-[#dddbdb88] px-6">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">Welcome back 👋</h2>
          <p className="text-gray-500 mb-6">
            Login to manage your tasks
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md outline"
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
                placeholder="*********"
                className="w-full px-4 py-2 border rounded-md outline"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
