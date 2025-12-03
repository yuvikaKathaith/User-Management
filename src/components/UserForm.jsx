/**
 * UserForm Component
 * Reusable form for creating and editing users
 * Handles form validation and submission
 */
import { useState } from "react"

export default function UserForm({ initialData, onSubmit, submitLabel = "Submit" }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "" },
    }
  )

  const [errors, setErrors] = useState({})

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

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.username.trim()) newErrors.username = "Username is required"

    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.phone.trim()) newErrors.phone = "Phone is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-card p-6 rounded-xl border border-border shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <h2 className="text-xl font-semibold text-foreground pb-2 border-b border-border">
        User Information
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 bg-secondary border rounded-lg text-foreground 
          placeholder:text-muted-foreground/60 focus:outline-none 
          ${
            errors.name
              ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
              : "border-border focus:ring-2 focus:ring-primary/50"
          } transition-all`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 bg-secondary border rounded-lg text-foreground
          placeholder:text-muted-foreground/60 focus:outline-none 
          ${
            errors.username
              ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
              : "border-border focus:ring-2 focus:ring-primary/50"
          } transition-all`}
          placeholder="johndoe"
        />
        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 bg-secondary border rounded-lg text-foreground 
          placeholder:text-muted-foreground/60 focus:outline-none 
          ${
            errors.email
              ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
              : "border-border focus:ring-2 focus:ring-primary/50"
          } transition-all`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 bg-secondary border rounded-lg text-foreground 
          placeholder:text-muted-foreground/60 focus:outline-none 
          ${
            errors.phone
              ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
              : "border-border focus:ring-2 focus:ring-primary/50"
          } transition-all`}
          placeholder="+1 234 567 8900"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Website
        </label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground 
          placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="www.example.com"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.company.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground 
          placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="Acme Corp"
        />
      </div>

      {/* Submit button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg 
          hover:bg-primary/90 transition-colors shadow-sm"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
