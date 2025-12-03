"use client"

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
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-secondary border ${
            errors.name ? "border-destructive" : "border-border"
          } rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
      </div>

      {/* Username Input */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
          Username *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-secondary border ${
            errors.username ? "border-destructive" : "border-border"
          } rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="johndoe"
        />
        {errors.username && <p className="mt-1 text-sm text-destructive">{errors.username}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-secondary border ${
            errors.email ? "border-destructive" : "border-border"
          } rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
      </div>

      {/* Phone Input */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-secondary border ${
            errors.phone ? "border-destructive" : "border-border"
          } rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="+1 234 567 8900"
        />
        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
      </div>

      {/* Website Input */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
          Website
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="www.example.com"
        />
      </div>

      {/* Company Name Input */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.company?.name || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="Acme Corp"
        />
      </div>

      {/* Submit Button */}
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
