import { Link } from "react-router-dom";
import heroImage from "../assets/images/logos/logo-bgless.png";
import "./home.css";

function Home() {
  return (
    <main className="home">

      {/* ---------- Hero Section ---------- */}

      <section className="hero">

        {/* Left Side */}
        <div className="hero-content">

          <p className="hero-label">
            PREMIUM ENGINE OILS & LUBRICANTS
          </p>

          <h1>
            KEEP YOUR
            <span>ENGINE</span>
            MOVING
          </h1>

          <p className="hero-description">
            Find the right oil and lubricant for your vehicle.
            Quality products, reliable performance, and convenient
            delivery right to your doorstep.
          </p>

          <div className="hero-buttons">

            <Link
              to="/catalog"
              className="btn btn-primary"
            >
              Shop Products
            </Link>

            <Link
              to="/catalog"
              className="btn btn-ghost"
            >
              Explore Catalog
            </Link>

          </div>

        </div>


        {/* Right Side */}
        <div className="hero-image">

          <img
            src={heroImage}
            alt="Octane-Link"
          />

        </div>

      </section>

    </main>
  );
}

export default Home;