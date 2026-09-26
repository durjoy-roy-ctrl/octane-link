import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import Admin from "./Pages/Admin";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  async function addToCart(product) {
    // Local state immediate update (Fast UI update)
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Backend Sync if logged in
    const token = localStorage.getItem("octane_token");
    if (!token) return;

    try {
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
        console.error("Failed to sync cart with backend:", data.message);
      }
    } catch (error) {
      console.error("Add to cart API error:", error);
    }
  }

  async function removeFromCart(productId) {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== productId)
    );

    const token = localStorage.getItem("octane_token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to remove item:", data.message);
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  }

  async function updateQuantity(productId, newQuantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    const token = localStorage.getItem("octane_token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: newQuantity
          })
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to update quantity:", data.message);
      }
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

  // Load saved user from LocalStorage on first load
  useEffect(() => {
    const savedUser = localStorage.getItem("octane_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing saved user", err);
      }
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Load user's cart from backend safely
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("octane_token");
    if (!token) return;

    fetch("http://localhost:5000/api/cart", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart from backend:", data);

        // Safe extraction for flexible backend data formats
        const itemsArray = data.items || (data.cart && data.cart.items) || [];

        const formattedCart = itemsArray
          .filter((item) => item && item.product)
          .map((item) => ({
            ...item.product,
            quantity: item.quantity
          }));

        setCart(formattedCart);
      })
      .catch((error) => {
        console.error("Failed to fetch cart:", error);
      });
  }, [user]);

  // Login function
  function login(userData, token) {
    setUser(userData);

    localStorage.getItem(
      "octane_user",
      JSON.stringify(userData)
    );

    localStorage.setItem("octane_token", token);

    console.log("Logged in user:", userData);
  }

  // Logout function
  function logout() {
    setUser(null);
    setCart([]);
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
          cartCount={cart.reduce(
            (total, item) => total + item.quantity,
            0
          )}
        />

        <Routes>

          <Route path="/" element={<Home />} />

          {/* About & Profile */}

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                logout={logout}
              />
            }
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

          {/* Admin */}

          <Route
            path="/admin"
            element={
              localStorage.getItem("octane_user") &&
                JSON.parse(
                  localStorage.getItem("octane_user")
                ).role === "admin"
                ? <Admin />
                : <Navigate to="/" />
            }
          />

          {/* Product catalog */}

          <Route
            path="/catalog"
            element={
              <ProductCatalog
                addToCart={addToCart}
                user={user}
              />
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* Main fuel routes */}

          <Route
            path="/buy"
            element={<Buy addToCart={addToCart} />}
          />

          <Route
            path="/sell"
            element={<Checkout />}
          />

          <Route
            path="/bulk-quote"
            element={<BulkQuote />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/invoice"
            element={<Invoice />}
          />

          {/* Authentication */}

          <Route
            path="/signup"
            element={
              <Signup
                login={login}
                user={user}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                login={login}
                user={user}
              />
            }
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          {/* Delivery system */}

          <Route
            path="/delivery"
            element={<Delivery />}
          />

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