/**
 * Layout Component (UI Updated – Functionality Unchanged)
 * Clean Blue + White theme
 */

import { Link, useLocation } from "react-router-dom"

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Navigation Header */}
      <header className="border-b border-blue-100 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Brand */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-blue-700">User Management</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "text-blue-600 font-semibold"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                Users
              </Link>

              <Link
                to="/create"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === "/create"
                    ? "text-blue-600 font-semibold"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                Create User
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
