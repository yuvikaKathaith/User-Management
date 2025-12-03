/**
 * CreateUser Page Component
 * Provides form interface for creating new users
 * Handles POST request to API and navigation on success
 */
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import UserForm from "../components/UserForm"
import ErrorAlert from "../components/ErrorAlert"
import SuccessAlert from "../components/SuccessAlert"

export default function CreateUser() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create user")
      }

      const newUser = await response.json()

      setSuccess("User created successfully! Redirecting...")

      // Navigate to home after 2 seconds
      setTimeout(() => {
        navigate("/", { state: { success: `User "${formData.name}" created successfully!` } })
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-4 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Users</span>
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
          Create New User
        </h1>
        <p className="text-slate-400 text-lg">Add a new user to the system</p>
      </div>

      {/* Alerts */}
      <ErrorAlert message={error} onDismiss={() => setError(null)} />
      <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />

      {/* Form Card */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-purple-500/10">
        <UserForm onSubmit={handleSubmit} submitLabel={loading ? "Creating..." : "Create User"} />
      </div>
    </div>
  )
}
