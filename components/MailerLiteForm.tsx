'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    ml?: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

export default function MailerLiteForm({ formId }: { formId: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initForm = () => {
      if (typeof window.ml === 'function') {
        // Re-call account to trigger MailerLite to rescan DOM for embedded forms
        window.ml('account', '2098239')
      }
    }

    // Check if the MailerLite script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://assets.mailerlite.com/js/universal.js"]'
    )

    if (existingScript) {
      // Script tag exists - wait a tick for it to be fully ready, then init
      const timer = setTimeout(initForm, 100)
      return () => clearTimeout(timer)
    } else {
      // Script not yet in DOM - load it dynamically
      const script = document.createElement('script')
      script.src = 'https://assets.mailerlite.com/js/universal.js'
      script.async = true
      script.onload = () => {
        initForm()
      }
      document.head.appendChild(script)

      // Also set up the queue in case ml isn't defined yet
      if (!window.ml) {
        window.ml = function (...args: unknown[]) {
          ;(window.ml!.q = window.ml!.q || []).push(args)
        } as Window['ml']
      }
      window.ml!('account', '2098239')
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div className="ml-embedded" data-form={formId}></div>
    </div>
  )
}
