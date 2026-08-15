import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/buy', label: 'Buy Fuel' },
  { to: '/sell', label: 'Sell Fuel' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/about', label: 'How It Works' },
]

export default function Navbar({ cartCount, user }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          Octane<span className="dot">Link</span>
        </NavLink>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <NavLink to="/cart" className="cart-link" title="Cart">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge pop" key={cartCount}>
                {cartCount}
              </span>
            )}
          </NavLink>

          {user ? (
            <NavLink to="/profile" className="nav-user">
              {user.name}
            </NavLink>
          ) : (
            <NavLink to="/login" className="btn btn-ghost btn-sm">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}