/**
 * Layout Component
 * Provides consistent layout structure with navigation header
 * Wraps all pages in the application
 */
import { Link, useLocation } from "react-router-dom"

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-transparent">
      {/* Navigation Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                User Management
              </span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-lg ${
                  location.pathname === "/"
                    ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Users
              </Link>
              <Link
                to="/create"
                className={`text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-lg ${
                  location.pathname === "/create"
                    ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
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
