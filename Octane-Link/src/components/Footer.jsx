import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} OctaneLink</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link to="/analytics" style={{ color: 'var(--text-dim)' }}>Analytics</Link>
          <Link to="/admin" style={{ color: 'var(--text-dim)' }}>Admin</Link>
          <span>Built with React &amp; React Router</span>
        </div>
      </div>
    </footer>
  )
}
