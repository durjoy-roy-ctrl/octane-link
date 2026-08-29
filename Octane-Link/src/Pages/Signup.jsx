import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const API_BASE_URL = 'http://localhost:5000/api'

const roles = [
    { value: 'retail', label: 'Retail Buyer' },
    { value: 'wholesale', label: 'Wholesale Buyer' },
    { value: 'delivery', label: 'Delivery Agent' },
]

export default function Signup({ login }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'retail' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Signup failed. Please try again.')
                setLoading(false)
                return
            }
            login(data.user, data.token)
            navigate('/')
        } catch (err) {
          
            console.error('Signup request failed:', err)
            setError('Could not reach the server. Is the backend running?')
            setLoading(false)
        }
    }

    return (
        <main className="container fade-in">
            <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 420 }}>
                    <p className="eyebrow" style={{ textAlign: 'center' }}>Join OctaneLink</p>
                    <h2 className="section-title" style={{ textAlign: 'center', fontSize: 28 }}>Create account</h2>

                    {error && (
                        <div className="success-banner" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                            {error}
                        </div>
                    )}

                    <form className="form-panel" onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
                        <div className="field">
                            <label htmlFor="name">Full name</label>
                            <input id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="field-row">
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX" required />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
                        </div>
                        <div className="field">
                            <label htmlFor="role">I am a</label>
                            <select id="role" name="role" value={form.role} onChange={handleChange}>
                                {roles.map((r) => (
                                    <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                        <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginTop: 16 }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--accent)' }}>Log in</Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    )
}
