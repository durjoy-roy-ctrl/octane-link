import { useNavigate, Navigate, Link } from 'react-router-dom'

export default function Profile({ user, logout }) {
  const navigate = useNavigate()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <main className="container fade-in">
      <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="form-panel" style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 28, fontWeight: 700, color: '#1a0d02',
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="section-title" style={{ fontSize: 22 }}>{user.name}</h2>
          <p className="section-sub" style={{ margin: '8px 0 20px' }}>{user.email}</p>
          {user.role && <p className="meta" style={{ marginBottom: 24 }}>Account type: <strong style={{ color: 'var(--amber)' }}>{user.role}</strong></p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/orders" className="btn btn-ghost btn-block">My Orders</Link>
            <Link to="/dashboard" className="btn btn-ghost btn-block">Seller Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-block">Log Out</button>
          </div>
        </div>
      </section>
    </main>
  )
}
