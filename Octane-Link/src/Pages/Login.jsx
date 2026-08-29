import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


const API_BASE_URL = 'http://localhost:5000/api'

export default function Login({ login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.')
        setLoading(false)
        return
      }

      login(data.user, data.token)
      navigate('/')
    } catch (err) {
      console.error('Login request failed:', err)
      setError('Could not reach the server. Is the backend running?')
      setLoading(false)
    }
  }

  return (
    <main className="container fade-in">
      <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Welcome back</p>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: 28 }}>Log in</h2>

          {error && (
            <div className="success-banner" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              {error}
            </div>
          )}

          <form className="form-panel" onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div style={{ textAlign: 'right', marginBottom: 16 }}>
              <Link to="/forgot-password" style={{ color: 'var(--text-dim)', fontSize: 13 }}>
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginTop: 16 }}>
              No account? <Link to="/signup" style={{ color: 'var(--accent)' }}>Sign up</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
