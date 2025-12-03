/**
 * UserCard Component
 * Displays individual user information in a card format
 * Provides actions for viewing, editing, and deleting users
 */
import { Link } from "react-router-dom"

export default function UserCard({ user, onDelete }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all duration-300 group-hover:scale-110">
            <span className="text-xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{user.name}</h3>
            <p className="text-sm text-purple-300">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="text-slate-300">{user.email}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="text-slate-300">{user.phone}</span>
        </div>

        {user.company && (
          <div className="flex items-center space-x-2 text-sm">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-slate-300">{user.company.name}</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2 pt-5 border-t border-purple-500/20">
        <Link
          to={`/user/${user.id}`}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
        >
          View Details
        </Link>
        <Link
          to={`/edit/${user.id}`}
          className="flex-1 px-4 py-2.5 bg-slate-800/70 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-all duration-300 text-center border border-slate-700"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(user.id)}
          className="px-4 py-2.5 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/20 transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
