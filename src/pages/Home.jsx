import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
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

  const location = useLocation()

  // Load initial users
  useEffect(() => {
    let isMounted = true

    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) throw new Error("Failed to fetch users")

        const data = await response.json()
        if (isMounted) setUsers(data)
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchUsers()
    return () => (isMounted = false)
  }, [])

  // Add newly created user (because JSONPlaceholder doesn't store it)
  useEffect(() => {
    if (location.state?.newUser) {
      setUsers(prev => [...prev, location.state.newUser])
      setSuccess("User created successfully!")
    }
  }, [location.state])

  // Auto hide success message
  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => setSuccess(null), 3000)
    return () => clearTimeout(timer)
  }, [success])

  // Delete user locally
  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Are you sure?")
    if (!confirmed) return

    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      })
      setUsers(prev => prev.filter((u) => u.id !== userId))
      setSuccess("User deleted!")
    } catch (err) {
      setError(err.message)
    }
  }

  // Search filter
  const filteredUsers = users.filter(u => {
    const q = searchTerm.toLowerCase()
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
    )
  })

  if (loading) return <LoadingSpinner />

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent mb-2">
            User Directory
          </h1>
          <p className="text-slate-500 text-lg">Manage and view all users</p>
        </div>

        <Link
          to="/create"
          className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-md"
        >
          Add New User
        </Link>
      </div>

      {/* Alerts */}
      <ErrorAlert message={error} onDismiss={() => setError(null)} />
      <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />

      {/* Search */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-blue-300 rounded-xl text-black focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Count */}
      <div className="mb-6">
        <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg border border-blue-300">
          Showing {filteredUsers.length} of {users.length} users
        </span>
      </div>

      {/* User Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 bg-white border border-blue-200 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-lg">No matching users</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((u) => (
            <UserCard key={u.id} user={u} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}