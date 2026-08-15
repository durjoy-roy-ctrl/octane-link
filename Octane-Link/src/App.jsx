// <<<<<<< HEAD
// /*import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// =======
// import { useState } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar.jsx'
// import Footer from './components/Footer.jsx'
// import Signup from './pages/Signup.jsx'
// import Login from './pages/Login.jsx'
// import Delivery from './pages/Delivery.jsx'
// import DeliveryTracking from './pages/DeliveryTracking.jsx'
// import DeliverySchedule from './pages/DeliverySchedule.jsx'
// >>>>>>> origin/main

// function App() {
//   const [user, setUser] = useState(null)

//   function login(name, email) {
//     const loggedInUser = { name, email }
//     setUser(loggedInUser)
//     console.log('User:', name)
//     console.log('Email:', email)
//   }

//    return (
//     <div className="page">
//       <Navbar user={user} cartCount={0} />

//       <Routes>
//         <Route path="/signup" element={<Signup login={login} />} />
//         <Route path="/login" element={<Login login={login} />} />

//         {/* Delivery system */}
//         <Route path="/delivery" element={<Delivery />} />
//         <Route path="/delivery/track" element={<DeliveryTracking />} />
//         <Route path="/delivery/schedule" element={<DeliverySchedule />} />
//       </Routes>

//       <Footer />
//     </div>
//   )
// }

// <<<<<<< HEAD
// export default App*/

// /*import "./App.css";
// import ProductCatalog from "./pages/ProductCatalog";
// function App() {
//   return <ProductCatalog />;
// }
// export default App;*/

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProductCatalog from "./pages/productCatalog";
// import ProductDetails from "./pages/productDetails";
// // import Signup from "./pages/Signup";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Navigate to="/catalog" replace />} />
//         <Route path="/catalog" element={<ProductCatalog />} />
//         <Route path="/product/:id" element={<ProductDetails />}
// />
//       </Routes>

//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;
// =======
// export default App
// >>>>>>> origin/main
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProductCatalog from "./pages/productCatalog";
import ProductDetails from "./pages/productDetails";

import Home from "./Pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Delivery from "./pages/Delivery";
import DeliveryTracking from "./pages/DeliveryTracking";
import DeliverySchedule from "./pages/DeliverySchedule";

function App() {
  const [user, setUser] = useState(null);

  function login(name, email) {
    const loggedInUser = { name, email };
    setUser(loggedInUser);

    console.log("User:", name);
    console.log("Email:", email);
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