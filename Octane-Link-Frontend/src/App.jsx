

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
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

import Delivery from "./Pages/Delivery";
import DeliveryTracking from "./Pages/DeliveryTracking";
import DeliverySchedule from "./Pages/DeliverySchedule";

import Buy from "./Pages/Buy";
import BulkQuote from "./Pages/BulkQuote";
import Checkout from "./Pages/Checkout";
import Invoice from "./Pages/Invoice";

import About from "./Pages/About";
import Profile from "./Pages/Profile";

import Cart from "./Pages/cart";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  async function addToCart(product) {
    const token = localStorage.getItem("octane_token");
    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1
      })
    });
    const data = await response.json();
    console.log("Cart response:", data);
    if (!response.ok) {
      console.error("Failed to add product to cart:", data.message);
      return;
    }
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id ?
            { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }]
    });
  }

  async function removeFromCart(productId) {
    const token = localStorage.getItem("octane_token");
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to remove item:", data.message);
        return;
      }
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  }

  async function updateQuantity(productId, newQuantity) {
    const token = localStorage.getItem("octane_token");
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ quantity: newQuantity })
        });
      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to update quantity:", data.message);
        return;
      }
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ?
            { ...item, quantity: newQuantity } : item));
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  }

  function increaseQuantity(productId) {
    const item = cart.find((item) => item._id === productId);
    if (!item) return;
    updateQuantity(productId, item.quantity + 1);
  }

  function decreaseQuantity(productId) {
    const item = cart.find((item) => item._id === productId);
    if (!item) return;
    if (item.quantity - 1 <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, item.quantity - 1);
    }
  }

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

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("octane_token");
    if (!token) return;
    fetch("http://localhost:5000/api/cart", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Cart from backend:", data);
        const formattedCart = data.items.map(item => ({
          ...item.product,
          quantity: item.quantity
        }));
        setCart(formattedCart);
      })
      .catch(error => {
        console.error("Failed to fetch cart:", error);
      });
  }, [user]);

  // Login function
  function login(userData, token) {
    setUser(userData);

    localStorage.setItem("octane_user", JSON.stringify(userData));
    localStorage.setItem("octane_token", token);

    console.log("Logged in user:", userData);
  }

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
        <Navbar
          user={user}
          cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* About & Profile */}
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={<Profile user={user} logout={logout} />}
          />

          {/* Product Cart */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            }
          />

          {/* Product catalog */}
          <Route path="/catalog"
            element={<ProductCatalog addToCart={addToCart} user={user} />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Main fuel routes */}
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Checkout />} />
          <Route path="/bulk-quote" element={<BulkQuote />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/invoice" element={<Invoice />} /> {/* 👈 নতুন Invoice রাউট */}

          {/* Authentication */}
          <Route path="/signup" element={<Signup login={login} user={user} />} />
          <Route path="/login" element={<Login login={login} user={user} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

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