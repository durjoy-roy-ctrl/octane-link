import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Signup from './pages/Signup.jsx'

function App() {

  function login(name, email) {
    console.log('User:', name)
    console.log('Email:', email)
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/signup"
          element={<Signup login={login} />}
        />
      </Routes>

      <Footer />
    </div>
  )
}

export default App