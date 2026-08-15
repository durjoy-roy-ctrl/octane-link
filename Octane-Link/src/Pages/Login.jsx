import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login({ login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const name = email.split('@')[0] || 'User'
    login(name, email)
    navigate('/')
  }

  return (
    <main className="container fade-in">
      <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Welcome back</p>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: 28 }}>Log in</h2>

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
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
            <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginTop: 16 }}>
              No account? <Link to="/signup" style={{ color: 'var(--accent)' }}>Sign up</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
