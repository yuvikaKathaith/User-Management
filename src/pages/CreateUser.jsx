/**
 * CreateUser Page Component — Blue/White Theme
 * Uses react-hot-toast and stores new users in localStorage
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import toast from "react-hot-toast";

export default function CreateUser() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to create user");

      await response.json();

      // Save locally
      const newUser = { id: Date.now(), ...formData };
      const existing = JSON.parse(localStorage.getItem("localUsers") || "[]");
      existing.push(newUser);
      localStorage.setItem("localUsers", JSON.stringify(existing));

      toast.success(`User "${formData.name}" created successfully!`);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="mb-10">
        <Link
          to="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-all mb-4 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-semibold">Back to Users</span>
        </Link>

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent mb-2">
          Create New User
        </h1>
        <p className="text-gray-400 text-lg">Add a new user to the system.</p>
      </div>

      {/* ALERTS */}
      <div className="space-y-4">
        <ErrorAlert message={error} onDismiss={() => setError(null)} />
        <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />
      </div>

      {/* FORM */}
      <div className="mt-6 bg-white/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all">
        <UserForm
          onSubmit={handleSubmit}
          submitLabel={loading ? "Creating..." : "Create User"}
        />
      </div>
    </div>
  );
}
