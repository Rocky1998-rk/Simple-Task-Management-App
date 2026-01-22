import { useState } from "react";

const ProfileEdit = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

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
          className="w-full px-3 py-2 border rounded dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          value={email}
          disabled
          className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEdit;
