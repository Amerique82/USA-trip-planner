import { useEffect, useRef } from 'react'

// Hook for managing focus within a component
export function useFocusManagement(isOpen = false) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement
      
      // Focus the first focusable element in the container
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    } else if (!isOpen && previousFocusRef.current) {
      // Restore focus to the previous element
      previousFocusRef.current.focus()
    }
  }, [isOpen])

  // Trap focus within the container when open
  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return

      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    containerRef.current.addEventListener('keydown', handleKeyDown)
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen])

  return containerRef
}

// Hook for screen reader announcements
export function useAnnouncer() {
  const announcerRef = useRef(null)

  const announce = (message, priority = 'polite') => {
    if (!announcerRef.current) return

    announcerRef.current.setAttribute('aria-live', priority)
    announcerRef.current.textContent = message
    
    // Clear the message after it's been announced
    setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = ''
      }
    }, 1000)
  }

  const AnnouncerComponent = () => (
    <div
      ref={announcerRef}
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    />
  )

  return { announce, AnnouncerComponent }
}

// Hook for skip navigation links
export function useSkipNavigation() {
  const skipLinkRef = useRef(null)

  const SkipLink = () => (
    <a
      ref={skipLinkRef}
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
    >
      Skip to main content
    </a>
  )

  return { SkipLink }
}

// Utility for generating unique IDs for accessibility
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// Utility for checking color contrast (simplified version)
export function getContrastRatio(hex1, hex2) {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)

  if (!rgb1 || !rgb2) return 1

  // Calculate relative luminance
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  // Calculate contrast ratio
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

// Component for keyboard navigation instructions
export function KeyboardInstructions({ instructions }) {
  return (
    <div className="sr-only" role="note" aria-label="Keyboard navigation instructions">
      <p>{instructions}</p>
    </div>
  )
}
