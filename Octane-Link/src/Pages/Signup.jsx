import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const roles = [
    {value: 'retail',label: 'Retail Buyer'},
    { value: 'wholesale', label: 'Wholesale Buyer' },
    { value: 'delivery', label: 'Delivery Agent' },
]


export default function Signup({login}){
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'retail' })
    const navigate = useNavigate()

    function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
   }

   function handleSubmit(e) {
    e.preventDefault()
    login(form.name, form.email)
    navigate('/login')
  }

  return(
   <main className="container fade-in">
      <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Join OctaneLink</p>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: 28 }}>Create account</h2>

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
              <select id="role" name="role" value={form.role}  onChange={handleChange}>
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create Account</button>
            <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginTop: 16 }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--accent)' }}>Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
