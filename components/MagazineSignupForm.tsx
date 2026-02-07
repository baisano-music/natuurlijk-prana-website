'use client'

import { useState, FormEvent } from 'react'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function MagazineSignupForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const formData = new FormData()
      formData.append('data[email]', email)
      formData.append('data[first_name]', firstName)

      const response = await fetch('https://forms.mailmunch.co/form/206285/422121/submit?resource_type=landing_page', {
        method: 'POST',
        body: formData,
        headers: {
          'X-MM-Form-Tool': 'contact_form',
        },
      })

      if (response.ok) {
        setStatus('success')
        setFirstName('')
        setEmail('')
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
      console.error('Form error:', error)
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-white mb-2">Gelukt!</h3>
        <p className="text-white/90">
          Check je inbox voor het PRANA e-magazine.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-white/70 hover:text-white text-sm underline"
        >
          Nog iemand aanmelden
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="Voornaam"
          className="w-full px-5 py-4 rounded-xl border-0 bg-white text-charcoal
                     placeholder:text-stone/60 focus:ring-2 focus:ring-white/50
                     outline-none transition-all text-lg"
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="E-mailadres"
          className="w-full px-5 py-4 rounded-xl border-0 bg-white text-charcoal
                     placeholder:text-stone/60 focus:ring-2 focus:ring-white/50
                     outline-none transition-all text-lg"
        />
      </div>

      {status === 'error' && (
        <div className="bg-white/10 text-white px-4 py-3 rounded-xl text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-coral hover:bg-coral-dark disabled:bg-coral/50
                   text-white font-medium py-4 px-6 rounded-xl
                   transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Even geduld...
          </span>
        ) : (
          'E-Magazine aanvragen'
        )}
      </button>
    </form>
  )
}
