'use client'

import { useState, useRef, FormEvent } from 'react'
import emailjs from '@emailjs/browser'

// EmailJS configuratie - vul hier je eigen gegevens in
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    // Check of EmailJS is geconfigureerd
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error')
      setErrorMessage('Contactformulier is nog niet geconfigureerd. Neem contact op via email.')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
    } catch (error: unknown) {
      setStatus('error')
      const emailError = error as { text?: string; status?: number }
      const errorText = emailError?.text || 'Onbekende fout'
      setErrorMessage(`Er ging iets mis: ${errorText}. Probeer het later opnieuw of stuur een email.`)
      console.error('EmailJS error:', JSON.stringify(error, null, 2))
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sage-50 rounded-2xl p-8 md:p-10 border border-sage-200 text-center">
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-charcoal mb-2">Bericht verzonden!</h3>
        <p className="text-stone mb-6">
          Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sage-600 hover:text-terracotta font-medium transition-colors"
        >
          Nog een bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Naam */}
      <div>
        <label htmlFor="user_name" className="block text-sm font-medium text-charcoal mb-2">
          Naam <span className="text-terracotta">*</span>
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-white
                     focus:border-sage-400 focus:ring-2 focus:ring-sage-100
                     outline-none transition-all text-charcoal"
          placeholder="Je naam"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="user_email" className="block text-sm font-medium text-charcoal mb-2">
          E-mailadres <span className="text-terracotta">*</span>
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-white
                     focus:border-sage-400 focus:ring-2 focus:ring-sage-100
                     outline-none transition-all text-charcoal"
          placeholder="je@email.nl"
        />
      </div>

      {/* Telefoon (optioneel) */}
      <div>
        <label htmlFor="user_phone" className="block text-sm font-medium text-charcoal mb-2">
          Telefoonnummer <span className="text-stone/60">(optioneel)</span>
        </label>
        <input
          type="tel"
          id="user_phone"
          name="user_phone"
          className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-white
                     focus:border-sage-400 focus:ring-2 focus:ring-sage-100
                     outline-none transition-all text-charcoal"
          placeholder="06 12345678"
        />
      </div>

      {/* Onderwerp */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
          Onderwerp <span className="text-terracotta">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-white
                     focus:border-sage-400 focus:ring-2 focus:ring-sage-100
                     outline-none transition-all text-charcoal"
        >
          <option value="">Kies een onderwerp</option>
          <option value="Kennismakingsgesprek">Kennismakingsgesprek aanvragen</option>
          <option value="Vraag over bloesemremedies">Vraag over bloesemremedies</option>
          <option value="Behandeling">Vraag over een behandeling</option>
          <option value="Producten">Vraag over producten</option>
          <option value="Anders">Anders</option>
        </select>
      </div>

      {/* Bericht */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
          Bericht <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-white
                     focus:border-sage-400 focus:ring-2 focus:ring-sage-100
                     outline-none transition-all text-charcoal resize-none"
          placeholder="Waar kan ik je mee helpen?"
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">
          {errorMessage}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-terracotta hover:bg-terracotta/90 disabled:bg-stone/40
                   text-white font-medium py-3 px-6 rounded-xl
                   transition-all duration-200
                   focus:ring-2 focus:ring-terracotta/50 focus:ring-offset-2"
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Verzenden...
          </span>
        ) : (
          'Verstuur bericht'
        )}
      </button>

      <p className="text-xs text-stone/70 text-center">
        Door dit formulier te verzenden ga je akkoord met de{' '}
        <a href="/privacy-en-disclaimer" className="underline hover:text-sage-600">
          privacy policy
        </a>
        .
      </p>
    </form>
  )
}
