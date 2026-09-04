import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashScreen from "./components/splashScreen";

import ProductCatalog from "./Pages/productCatalog";
import ProductDetails from "./Pages/productDetails";
import Home from "./Pages/home";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import Delivery from "./Pages/Delivery";
import DeliveryTracking from "./Pages/DeliveryTracking";
import DeliverySchedule from "./Pages/DeliverySchedule";

import Buy from "./Pages/Buy";
import BulkQuote from "./Pages/BulkQuote";
import Checkout from "./Pages/Checkout";

import About from "./Pages/About";
import Profile from "./Pages/Profile";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);

  // Load saved user from LocalStorage on first load
  useEffect(() => {
    const savedUser = localStorage.getItem("octane_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Login function
  function login(userData, token) {
    setUser(userData);

    localStorage.setItem("octane_user", JSON.stringify(userData));
    localStorage.setItem("octane_token", token);

    console.log("Logged in user:", userData);
  }

  // Logout function
  function logout() {
    setUser(null);

    localStorage.removeItem("octane_user");
    localStorage.removeItem("octane_token");
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

          {/* About & Profile */}
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={<Profile user={user} logout={logout} />}
          />

          {/* Product catalog */}
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Main fuel routes */}
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Checkout />} />
          <Route path="/bulk-quote" element={<BulkQuote />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Authentication */}
          <Route path="/signup" element={<Signup login={login} />} />
          <Route path="/login" element={<Login login={login} />} />

          {/* Delivery system */}
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/delivery/track" element={<DeliveryTracking />} />
          <Route path="/delivery/schedule" element={<DeliverySchedule />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;