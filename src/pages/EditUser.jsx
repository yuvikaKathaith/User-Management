/**
 * EditUser Page Component
 * Provides form interface for editing existing users
 * Fetches current user data and handles PUT request to API
 */
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import UserForm from "../components/UserForm"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorAlert from "../components/ErrorAlert"
import SuccessAlert from "../components/SuccessAlert"

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser()
  }, [id])

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch user")
      }

      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true)
      setError(null)

      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: Number.parseInt(id) }),
      })

      if (!response.ok) {
        throw new Error("Failed to update user")
      }

      const updatedUser = await response.json()

      setSuccess("User updated successfully! Redirecting...")

      // Navigate to user detail page after 2 seconds
      setTimeout(() => {
        navigate(`/user/${id}`, { state: { success: "User updated successfully!" } })
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorAlert message={error || "User not found"} />
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/user/${id}`}
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
          <span className="font-semibold">Back to User Details</span>
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
          Edit User
        </h1>
        <p className="text-slate-400 text-lg">Update user information</p>
      </div>

      {/* Alerts */}
      <ErrorAlert message={error} onDismiss={() => setError(null)} />
      <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />

      {/* Form Card */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-purple-500/10">
        <UserForm initialData={user} onSubmit={handleSubmit} submitLabel={submitting ? "Updating..." : "Update User"} />
      </div>
    </div>
  )
}
