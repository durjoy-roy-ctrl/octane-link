import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

function App() {
  const [user, setUser] = useState(null)

  function login(name, email) {
    const loggedInUser = { name, email }
    setUser(loggedInUser)
    console.log('User:', name)
    console.log('Email:', email)
  }

   return (
    <div className="page">
      <Navbar user={user} cartCount={0} />

      <Routes>
        <Route path="/signup" element={<Signup login={login} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App