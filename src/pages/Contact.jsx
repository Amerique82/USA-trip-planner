import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validateField = (name, value) => {
    const newErrors = { ...errors }
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required'
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'subject':
        if (!value) {
          newErrors.subject = 'Please select a subject'
        } else {
          delete newErrors.subject
        }
        break
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required'
        } else if (value.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters'
        } else if (value.trim().length > 1000) {
          newErrors.message = 'Message must be less than 1000 characters'
        } else {
          delete newErrors.message
        }
        break
    }
    
    return newErrors
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    
    if (touched[name]) {
      const newErrors = validateField(name, value)
      setErrors(newErrors)
    }
  }

  const handleBlur = e => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    const newErrors = validateField(name, form[name])
    setErrors(newErrors)
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(form).forEach(field => {
      const fieldErrors = validateField(field, form[field])
      Object.assign(newErrors, fieldErrors)
    })
    return newErrors
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const allTouched = Object.keys(form).reduce((acc, field) => ({ ...acc, [field]: true }), {})
    setTouched(allTouched)

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setSubmitting(true)
      setServerError('')
      try {
        const data = new FormData()
        Object.entries(form).forEach(([k, v]) => data.append(k, v))

        const res = await fetch('https://www.usa-trip-planner.com/contact_form.php', { method: 'POST', body: data })
        if (res.ok) {
          setSent(true)
        } else {
          setServerError('Something went wrong. Please try again.')
        }
      } catch {
        setServerError('Network error. Please check your connection and try again.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/usa-trip-planner-contact.webp"
          alt="Contact us hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary-900 mb-3">Get in Touch</h1>
          <p className="text-primary-800 text-sm md:text-base max-w-xl">Have a question, suggestion, or just want to say hello? We'd love to hear from you.</p>
        </div>
      </div>

      {/* ── Main content: Form + Image side by side ── */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">

          {/* LEFT — Contact Form */}
          <div className="bg-white p-8 md:p-12">
            <h2 className="text-2xl font-heading font-bold text-primary-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-400 text-sm mb-8">We'll get back to you within 1–2 business days.</p>

            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 text-sm mb-5">Thanks for reaching out. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="text-sm text-primary-500 hover:text-primary-700 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {serverError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                    {serverError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name <span className="text-accent-500">*</span></label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Jane Smith"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                        touched.name && errors.name 
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                          : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100'
                      }`}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {touched.name && errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-600" role="alert">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-accent-500">*</span></label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                      placeholder="jane@email.com"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                        touched.email && errors.email 
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                          : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100'
                      }`}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject <span className="text-accent-500">*</span></label>
                  <select
                    name="subject" value={form.subject} onChange={handleChange} onBlur={handleBlur}
                    id="contact-subject"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors bg-white text-gray-700 ${
                      touched.subject && errors.subject 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                  >
                    <option value="">Select</option>
                    {['General Inquiry','Booking Question','Technical Support','Partnership','Other'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {touched.subject && errors.subject && (
                    <p id="subject-error" className="mt-1 text-xs text-red-600" role="alert">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-accent-500">*</span></label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} rows={5}
                    placeholder="Tell us how we can help..."
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors resize-none ${
                      touched.message && errors.message 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {touched.message && errors.message && (
                      <p id="message-error" className="text-xs text-red-600" role="alert">{errors.message}</p>
                    )}
                    <span className={`text-xs ${form.message.length > 1000 ? 'text-red-600' : 'text-gray-400'} ml-auto`}>
                      {form.message.length}/1000 characters
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  By submitting this form you agree to our{' '}
                  <Link to="/about" className="text-accent-500 hover:underline">Privacy Policy</Link>.
                </p>

                <button 
                  type="submit" 
                  className="btn-accent px-8 py-3 text-sm font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting || Object.keys(errors).some(key => errors[key]) || Object.values(form).some(val => !val.toString().trim())}
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — Photo top + contact info bottom */}
          <div className="hidden lg:flex flex-col">
            {/* Photo — top half */}
            <div className="h-1/2 overflow-hidden group">
              <img
                src="/usa-trip-planner-contact-form.webp"
                alt="Orlando Florida"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Contact info — bottom half */}
            <div className="h-1/2 bg-primary-900 p-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">hello@usatripplanner.com</p>
                  <p className="text-gray-400 text-xs">We reply within 1–2 business days</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">@usatripplanner</p>
                  <p className="text-gray-400 text-xs">DM us for quick questions</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Somewhere in the USA</p>
                  <p className="text-gray-400 text-xs">Exploring, always</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Mobile-only contact info (hidden on desktop) ── */}
        <div className="lg:hidden mt-8 space-y-4 max-w-5xl mx-auto">
          <h2 className="text-xl font-heading font-bold text-primary-900">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 text-center">
              <p className="text-sm font-bold text-primary-900 mb-1">Email</p>
              <a href="mailto:hello@usatripplanner.com" className="text-sm text-accent-500">hello@usatripplanner.com</a>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 text-center">
              <p className="text-sm font-bold text-primary-900 mb-1">Instagram</p>
              <a href="https://www.instagram.com/usatripplanner/" target="_blank" rel="noopener noreferrer" className="text-sm text-accent-500">@usatripplanner</a>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 text-center">
              <p className="text-sm font-bold text-primary-900 mb-1">Location</p>
              <p className="text-sm text-gray-500">Somewhere in the USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
