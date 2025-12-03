"use client"

/**
 * UserCard Component (UI Updated – Functionality Unchanged)
 * Blue + White modern theme
 */
import { Link } from "react-router-dom"

export default function UserCard({ user, onDelete }) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">

          {/* Avatar Circle */}
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-blue-700">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold text-blue-800">{user.name}</h3>
            <p className="text-sm text-slate-500">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">

        {/* Email */}
        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span className="text-slate-600">{user.email}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span className="text-slate-600">{user.phone}</span>
        </div>

        {/* Company */}
        {user.company && (
          <div className="flex items-center space-x-2 text-sm">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span className="text-slate-600">{user.company.name}</span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-2 pt-4 border-t border-blue-100">

        {/* View */}
        <Link
          to={`/user/${user.id}`}
          className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded-lg 
            hover:bg-blue-100 transition text-center"
        >
          View Details
        </Link>

        {/* Edit */}
        <Link
          to={`/edit/${user.id}`}
          className="flex-1 px-4 py-2 bg-slate-100 text-slate-800 font-medium text-sm rounded-lg
            hover:bg-slate-200 transition text-center"
        >
          Edit
        </Link>

        {/* Delete */}
        <button
          onClick={() => onDelete(user.id)}
          className="px-4 py-2 bg-red-50 text-red-600 font-medium text-sm rounded-lg 
            hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
