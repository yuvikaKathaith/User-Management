/**
 * UserForm Component
 * Reusable form for creating and editing users
 * Handles form validation and submission
 */
import { useState } from "react"

export default function UserForm({ initialData, onSubmit, submitLabel = "Submit" }) {
  // Form state management
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: {
        name: "",
      },
    },
  )

  const [errors, setErrors] = useState({})

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "companyName") {
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, name: value },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Validate form data
  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-purple-300 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-900/50 backdrop-blur-xl border ${
            errors.name ? "border-red-500/50" : "border-purple-500/20"
          } rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Username Input */}
      <div>
        <label htmlFor="username" className="block text-sm font-semibold text-blue-300 mb-2">
          Username *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-900/50 backdrop-blur-xl border ${
            errors.username ? "border-red-500/50" : "border-blue-500/20"
          } rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/20`}
          placeholder="johndoe"
        />
        {errors.username && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.username}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-cyan-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-900/50 backdrop-blur-xl border ${
            errors.email ? "border-red-500/50" : "border-cyan-500/20"
          } rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/20`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-green-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-900/50 backdrop-blur-xl border ${
            errors.phone ? "border-red-500/50" : "border-green-500/20"
          } rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-green-500/20`}
          placeholder="+1 234 567 8900"
        />
        {errors.phone && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.phone}
          </p>
        )}
      </div>

      {/* Website Input */}
      <div>
        <label htmlFor="website" className="block text-sm font-semibold text-slate-300 mb-2">
          Website
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-600/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-slate-500/20"
          placeholder="www.example.com"
        />
      </div>

      {/* Company Name Input */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-semibold text-slate-300 mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.company?.name || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-600/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-slate-500/20"
          placeholder="Acme Corp"
        />
      </div>

      {/* Submit Button */}
      <div className="flex space-x-4 pt-6">
        <button
          type="submit"
          className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 hover:scale-105"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
