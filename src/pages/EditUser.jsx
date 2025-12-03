/**
 * EditUser Page Component (Blue/White UI)
 */
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserForm from "../components/UserForm";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    const userId = Number(id);
    setLoading(true);
    setError(null);

    // CHECK LOCAL USER FIRST
    const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const localUser = localUsers.find((u) => u.id === userId);

    if (localUser) {
      setUser(localUser);
      setLoading(false);
      return; // ⛔ DO NOT FETCH FROM API
    }

    // IF NOT LOCAL → FETCH FROM API
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      if (!response.ok) {
        setError("User not found");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);

      const userId = Number(id);

      let localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");

      const index = localUsers.findIndex((u) => u.id === userId);

      if (index === -1) {
        // user not in localStorage → show error
        setError("User not found locally");
        return;
      }

      // UPDATE LOCAL USER
      localUsers[index] = { ...localUsers[index], ...formData };
      localStorage.setItem("localUsers", JSON.stringify(localUsers));

      setSuccess("User updated successfully! Redirecting...");

      return setTimeout(() => {
        navigate(`/user/${id}`, {
          state: { success: "User updated successfully!" },
        });
      }, 1500);
    } catch (err) {
      setError("Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
        <ErrorAlert message={error || "User not found"} />
        <Link
          to="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors mt-4"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="mb-10">
        <Link
          to={`/user/${id}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-all mb-4 group"
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
          <span className="font-semibold">Back to User Details</span>
        </Link>

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent mb-2">
          Edit User
        </h1>
        <p className="text-gray-500 text-lg">Update user information</p>
      </div>

      {/* ALERTS */}
      <div className="space-y-3">
        <ErrorAlert message={error} onDismiss={() => setError(null)} />
        <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />
      </div>

      {/* FORM CARD */}
      <div className="mt-6 bg-white/90 border border-blue-300/30 rounded-2xl p-8 shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all">
        <UserForm
          initialData={user}
          onSubmit={handleSubmit}
          submitLabel={submitting ? "Updating..." : "Update User"}
        />
      </div>
    </div>
  );
}
