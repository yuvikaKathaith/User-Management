/**
 * UserDetail Page Component
 * Displays comprehensive information about a single user
 * Fetches user data based on URL parameter
 */
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorAlert from "../components/ErrorAlert"

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [id])

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch user details")
      }

      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete user")

      navigate("/", { state: { success: "User deleted successfully!" } })
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <LoadingSpinner />

  if (error || !user) {
    return (
      <div>
        <ErrorAlert message={error || "User not found"} />
        <Link to="/" className="inline-flex items-center text-slate-700 hover:text-slate-900 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-slate-700 hover:text-slate-900 transition-colors mb-6 group"
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

      {/* User Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-blue-300 p-8 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-4xl font-bold text-slate-800">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">{user.name}</h1>
                <p className="text-slate-600 mt-2 text-lg">@{user.username}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/edit/${user.id}`}
                className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-slate-900 transition-all"
              >
                Edit User
              </Link>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-100 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-200 transition-all border border-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <p><span className="font-semibold text-slate-600">Email:</span> {user.email}</p>
                <p><span className="font-semibold text-slate-600">Phone:</span> {user.phone}</p>
                <p>
                  <span className="font-semibold text-slate-600">Website:</span>{" "}
                  <a href={`http://${user.website}`} target="_blank" className="underline text-slate-700">
                    {user.website}
                  </a>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Address</h2>
              <div className="space-y-3 text-slate-700">
                <p>{user.address.street}</p>
                <p>{user.address.suite}</p>
                <p>{user.address.city}, {user.address.zipcode}</p>
                <div className="mt-4 pt-4 border-t border-slate-300">
                  <p className="font-semibold text-slate-600 mb-1">Coordinates</p>
                  <p>Lat: {user.address.geo.lat}</p>
                  <p>Lng: {user.address.geo.lng}</p>
                </div>
              </div>
            </div>

            {/* Company */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 md:col-span-2">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
                <p><span className="font-semibold text-slate-600">Name:</span> {user.company.name}</p>
                <p><span className="font-semibold text-slate-600">Catch Phrase:</span> {user.company.catchPhrase}</p>
                <p><span className="font-semibold text-slate-600">Business:</span> {user.company.bs}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
