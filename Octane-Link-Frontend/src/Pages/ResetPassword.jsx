import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000/api'

export default function ResetPassword() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Reset failed')
        setLoading(false)
        return
      }

      alert('Password updated! Please login with your new password.')
      navigate('/login')
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
          <p className="eyebrow" style={{ textAlign: 'center' }}>Set New Password</p>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: 26 }}>New Password</h2>

          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: 15 }}>{error}</p>}

          <form className="form-panel" onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <div className="field">
              <label htmlFor="password">Enter New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}