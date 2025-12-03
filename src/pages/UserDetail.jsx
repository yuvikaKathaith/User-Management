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

  // Fetch user details on component mount
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

  // Handle user deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete user")
      }

      // Navigate back to home after successful deletion
      navigate("/", { state: { success: "User deleted successfully!" } })
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !user) {
    return (
      <div>
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
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6 group"
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
      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 border-b border-purple-500/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/50">
                <span className="text-4xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-purple-300 mt-2 text-lg">@{user.username}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/edit/${user.id}`}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
              >
                Edit User
              </Link>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500/10 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/20 transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
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
            <div className="bg-slate-800/30 p-6 rounded-xl border border-purple-500/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-3"></span>
                Contact Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-2">Email</label>
                  <p className="text-white text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-300 mb-2">Phone</label>
                  <p className="text-white text-lg">{user.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-300 mb-2">Website</label>
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors text-lg underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-slate-800/30 p-6 rounded-xl border border-blue-500/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-3"></span>
                Address
              </h2>
              <div className="space-y-3">
                <p className="text-white text-lg">{user.address.street}</p>
                <p className="text-white text-lg">{user.address.suite}</p>
                <p className="text-white text-lg">
                  {user.address.city}, {user.address.zipcode}
                </p>
                <div className="mt-5 pt-5 border-t border-slate-700">
                  <label className="block text-sm font-semibold text-cyan-300 mb-2">Coordinates</label>
                  <p className="text-slate-300">
                    Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                  </p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="bg-slate-800/30 p-6 rounded-xl border border-green-500/10 md:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></span>
                Company
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-green-300 mb-2">Name</label>
                  <p className="text-white text-lg">{user.company.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-emerald-300 mb-2">Catch Phrase</label>
                  <p className="text-white text-lg">{user.company.catchPhrase}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-teal-300 mb-2">Business</label>
                  <p className="text-white text-lg">{user.company.bs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
