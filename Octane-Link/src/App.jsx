import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import SplashScreen from "./components/splashScreen";

import ProductCatalog from "./pages/productCatalog";
import ProductDetails from "./pages/productDetails";

import Home from "./Pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Delivery from "./pages/Delivery";
import DeliveryTracking from "./pages/DeliveryTracking";
import DeliverySchedule from "./pages/DeliverySchedule";
import About from "./pages/About";
import Profile from "./pages/Profile"; // <-- Profile Import kora hoyeche

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);

  // Load saved user from LocalStorage on first load
  useEffect(() => {
    const savedUser = localStorage.getItem('octane_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function login(name, email) {
    const loggedInUser = { name, email };
    setUser(loggedInUser);
    localStorage.setItem('octane_user', JSON.stringify(loggedInUser));

    console.log("User:", name);
    console.log("Email:", email);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('octane_user');
    localStorage.removeItem('octane_token');
  }

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Navbar user={user} cartCount={0} />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* About & Profile Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile user={user} logout={logout} />} />

          {/* Product catalog */}
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Authentication */}
          <Route path="/signup" element={<Signup login={login} />} />
          <Route path="/login" element={<Login login={login} />} />

          {/* Delivery system */}
          <Route path="/delivery" element={<Delivery />} />
          <Route
            path="/delivery/track"
            element={<DeliveryTracking />}
          />
          <Route
            path="/delivery/schedule"
            element={<DeliverySchedule />}
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;