
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

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function login(name, email) {
    const loggedInUser = { name, email };
    setUser(loggedInUser);

    console.log("User:", name);
    console.log("Email:", email);
  }

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Navbar user={user} cartCount={0} />

        <Routes>
          
          <Route path="/" element={<Home/>}/>

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