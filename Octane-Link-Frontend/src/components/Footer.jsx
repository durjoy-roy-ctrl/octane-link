import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="brand">
              OCTANE<span className="dot">LINK</span>
            </Link>
            <p className="footer-desc">
              An end-to-end digital fuel management &amp; delivery platform built for modern logistical efficiency.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalog">Catalog</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/delivery">Delivery</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="/buy">Buy Fuel</Link></li>
              <li><Link to="/checkout">Sell Fuel</Link></li>
              <li><Link to="/bulk-quote">Bulk Quote</Link></li>
              <li><Link to="/delivery/track">Track Order</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Developers</h4>
            <div className="dev-list">
              <div className="dev-card">
                <span className="dev-name">Durjoy Roy</span>
                <span className="dev-role">Backend &amp; Auth</span>
              </div>
              <div className="dev-card">
                <span className="dev-name">Rafi Abdur</span>
                <span className="dev-role">Frontend &amp; UI</span>
              </div>
              <div className="dev-card">
                <span className="dev-name">Amdadul Hasan</span>
                <span className="dev-role">Cart &amp; Products</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} OctaneLink</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link to="/analytics" style={{ color: 'var(--text-dim)' }}>Analytics</Link>
            <Link to="/admin" style={{ color: 'var(--text-dim)' }}>Admin</Link>
            <span>Built with React &amp; React Router</span>
          </div>
        </div>

      </div>
    </footer>
  );
}