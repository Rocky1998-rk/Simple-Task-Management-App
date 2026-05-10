import { useState } from "react";

const ProfileEdit = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (API later)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Edit Profile</h3>

      <div>
        <label className="block text-sm">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          value={email}
          disabled
          className="w-full cursor-not-allowed rounded border border-slate-300 bg-slate-100 px-3 py-2 text-slate-500 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
        />
      </div>

      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEdit;
