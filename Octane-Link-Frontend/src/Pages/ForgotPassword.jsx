import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Something went wrong!')
        setLoading(false)
        return
      }

      setSent(true)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError('Could not connect to the server.')
      setLoading(false)
    }
  }

  return (
    <main className="container fade-in">
      <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Account recovery</p>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: 26 }}>Reset your password</h2>

          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: 15 }}>{error}</p>
          )}

          {sent ? (
            <div className="form-panel pop" style={{ maxWidth: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>📩</div>
              <p className="section-sub" style={{ margin: '0 0 16px' }}>
                A password reset link has been sent to <strong>{email}</strong>.
              </p>
              <Link to="/login" className="btn btn-primary btn-block">Back to Login</Link>
            </div>
          ) : (
            <form className="form-panel" onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
              <p className="section-sub" style={{ margin: '0 0 16px' }}>
                Enter the email linked to your account and we'll send a reset link.
              </p>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </button>
              <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginTop: 16 }}>
                <Link to="/login" style={{ color: 'var(--accent)' }}>Back to login</Link>
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}