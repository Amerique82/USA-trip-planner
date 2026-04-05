import React from 'react'

// Loading spinner component
export function LoadingSpinner({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xlarge: 'w-12 h-12'
  }

  return (
    <div 
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-500 ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Skeleton loader for cards
export function CardSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card animate-pulse" role="status" aria-label={`Loading item ${index + 1}`}>
          <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="absolute top-3 left-3 bg-gray-300 text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
              Category
            </div>
            <div className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full">
              <div className="w-4 h-4 bg-gray-300"></div>
            </div>
          </div>
          <div className="p-4">
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </>
  )
}

// Full page loading
export function PageLoading({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" role="status" aria-label="Loading page">
      <div className="text-center">
        <LoadingSpinner size="xlarge" className="mx-auto mb-4" />
        <p className="text-gray-500 text-sm">{message}</p>
      </div>
    </div>
  )
}

// Button loading state
export function ButtonLoading({ children, loading, disabled, className = '', ...props }) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`relative ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="small" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  )
}

// Inline loading for small sections
export function InlineLoading({ message = 'Loading...', className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-gray-500 text-sm ${className}`} role="status" aria-label="Loading content">
      <LoadingSpinner size="small" />
      <span>{message}</span>
    </div>
  )
}

// Loading overlay for modals/panels
export function LoadingOverlay({ show, message = 'Loading...' }) {
  if (!show) return null

  return (
    <div 
      className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
      role="status"
      aria-label="Loading overlay"
    >
      <div className="text-center">
        <LoadingSpinner size="large" className="mx-auto mb-3" />
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  )
}
