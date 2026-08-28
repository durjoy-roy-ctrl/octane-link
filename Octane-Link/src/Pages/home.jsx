import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO OCTANE-LINK</p>

          <h1>
            POWER YOUR RIDE
            <br />
            WITH THE RIGHT OIL
          </h1>

          <p className="hero-description">
            Premium engine oils and lubricants designed to keep your vehicle
            running smoothly and efficiently.
          </p>

          <Link to="/catalog" className="hero-button">
            Browse Products
          </Link>
        </div>

        <div className="hero-image">
          <img src="src/assets/images/logos/logo-bgless.png" alt="Octane-Link" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <div className="section-heading">
          <p className="section-label">WHY OCTANE-LINK?</p>

          <h2>
            BUILT FOR YOUR
            <br />
            VEHICLE
          </h2>

          <p>Everything you need to keep your engine performing at its best.</p>
        </div>

        <div className="feature-grid">
          <div className="feature">
            <div className="feature-number">01</div>

            <h3>GENUINE QUALITY</h3>

            <p>
              Choose from trusted oils and lubricants from well-known brands.
            </p>
          </div>

          <div className="feature">
            <div className="feature-number">02</div>

            <h3>VEHICLE COMPATIBILITY</h3>

            <p>
              Find products suitable for different vehicles and engine types.
            </p>
          </div>

          <div className="feature">
            <div className="feature-number">03</div>

            <h3>RELIABLE DELIVERY</h3>

            <p>
              Get your selected products delivered conveniently to your door.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <p className="section-label">ABOUT OCTANE-LINK</p>

          <h2>
            KEEP YOUR ENGINE
            <br />
            RUNNING STRONG
          </h2>

          <p>
            Octane-Link makes it easier to find the right engine oil and
            lubricant for your vehicle. Explore our catalog, check product
            details, and choose what fits your vehicle.
          </p>

          <Link to="/catalog" className="about-button">
            Explore Catalog
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-cta">
        <p className="section-label">YOUR VEHICLE DESERVES THE BEST</p>

        <h2>
          READY TO FIND
          <br />
          THE RIGHT OIL?
        </h2>

        <Link to="/catalog" className="hero-button">
          Browse Catalog
        </Link>
      </section>
    </main>
  );
}

export default Home;
