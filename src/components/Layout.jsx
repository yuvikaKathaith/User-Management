import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserCard from "../components/UserCard"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorAlert from "../components/ErrorAlert"
import SuccessAlert from "../components/SuccessAlert"

export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("https://jsonplaceholder.typicode.com/users")

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user?")) return

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete user")

      setUsers(users.filter((user) => user.id !== userId))
      setSuccess("User deleted successfully!")
    } catch (err) {
      setError(err.message)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-white min-h-screen p-4 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-blue-700">User Directory</h1>
          <p className="text-blue-500 text-lg">Manage and view all users</p>
        </div>

        <Link
          to="/create"
          className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </Link>
      </div>

      {/* Alerts */}
      <ErrorAlert message={error} onDismiss={() => setError(null)} />
      <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-blue-300 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Count */}
      <div className="mb-6">
        <span className="px-4 py-2 bg-blue-100 text-blue-600 text-sm font-semibold rounded-lg border border-blue-200">
          Showing {filteredUsers.length} of {users.length} users
        </span>
      </div>

      {/* Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-blue-500 text-lg">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
