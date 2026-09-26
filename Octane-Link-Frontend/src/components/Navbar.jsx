import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/buy', label: 'Buy Fuel' },
  { to: '/sell', label: 'Checkout' },
  { to: '/invoice', label: 'Invoice' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/about', label: 'How It Works' },
]

const adminLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/admin', label: 'Admin' },
]

export default function Navbar({ cartCount, user }) {
  const isAdmin = user?.role === 'admin'

  const currentLinks = isAdmin ? adminLinks : links

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          Octane<span className="dot">Link</span>
        </NavLink>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ul className="nav-links">
            {currentLinks.map((link) => (
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

          {!isAdmin && (
            <NavLink to="/cart" className="cart-link" title="Cart">
              🛒
              {cartCount > 0 && (
                <span className="cart-badge pop" key={cartCount}>
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

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
