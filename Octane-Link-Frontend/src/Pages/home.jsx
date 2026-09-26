import { Link } from "react-router-dom";
import "./home.css";
import image1 from "../assets/images/products/images1.png";
import image2 from "../assets/images/products/images2.jpg";
import image3 from "../assets/images/products/images3.png";



function Home() {
  return (
    <main className="home">

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-content">

          <p className="hero-label">
            WELCOME TO OCTANE-LINK
          </p>

          <h1>
            POWER YOUR RIDE
            <br />
            WITH THE RIGHT OIL
          </h1>

          <p className="hero-description">
            Octane-Link is a fuel and lubricant marketplace designed to help
            you find the right products for your vehicle.
          </p>

          <p className="hero-description">
            Explore engine oils, lubricants, and other vehicle products from
            different brands while checking important information such as
            compatibility, oil type, price, and availability.
          </p>

          <Link to="/catalog" className="hero-button">
            Browse Products
          </Link>

        </div>

        <div className="hero-image">
          <img
            src="src/assets/images/logos/logo-bgless.png"
            alt="Octane-Link"
          />
        </div>
      </section>


      {/* ================= INTRO ================= */}

      <section className="intro">
        <div className="intro-content">

          <p className="section-label">
            ENGINE CARE MADE SIMPLE
          </p>

          <h2>
            THE RIGHT PRODUCT
            <br />
            MAKES A DIFFERENCE
          </h2>

          <p>
            Your vehicle's engine works continuously whenever you drive.
            Engine oil helps lubricate moving components, reduce friction,
            and support smooth engine operation.
          </p>

          <p>
            Finding a suitable product does not always have to be difficult.
            Octane-Link brings different engine oils and lubricants together
            so you can explore your options in one place.
          </p>

        </div>
      </section>


      {/* ================= PETROL STORY ================= */}

      <section className="story-section">

        <div className="story-text">

          <p className="section-label">
            POWER FOR THE ROAD
          </p>

          <h2>
            KEEP YOUR
            <br />
            ENGINE MOVING
          </h2>

          <p>
            Every journey starts with reliable performance. From daily
            commutes to long-distance trips, your vehicle depends on its
            engine and the products that keep it running smoothly.
          </p>

          <p>
            Octane-Link gives you a convenient place to explore fuel-related
            products, engine oils, and lubricants for different vehicle
            requirements.
          </p>

        </div>

        <div className="story-image">
          <img src={image1} alt="Petrol" />
        </div>

      </section>


      {/* ================= ENGINE STORY ================= */}

      <section className="story-section story-reverse">

        <div className="story-image">
          <img src={image2} alt="Petrol" />
        </div>

        <div className="story-text">

          <p className="section-label">
            ENGINE CARE
          </p>

          <h2>
            PROTECT WHAT
            <br />
            POWERS YOU
          </h2>

          <p>
            Inside every engine, many components work together at high speed.
            Proper lubrication helps reduce friction between these moving
            parts and supports efficient engine operation.
          </p>

          <p>
            Different vehicles can require different oil types and
            specifications. That is why checking product information before
            purchasing is important.
          </p>

        </div>

      </section>


      {/* ================= WHY US ================= */}

      <section className="why-us">

        <div className="section-heading">

          <p className="section-label">
            WHY OCTANE-LINK?
          </p>

          <h2>
            BUILT FOR YOUR
            <br />
            VEHICLE
          </h2>

          <p>
            We bring product discovery, vehicle compatibility, ordering, and
            delivery together in one convenient platform.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature">

            <div className="feature-number">
              01
            </div>

            <h3>
              GENUINE QUALITY
            </h3>

            <p>
              Explore engine oils and lubricants from recognized brands and
              view important information before selecting a product.
            </p>

            <p>
              Product details such as brand, oil type, price, stock, and
              description help you understand what you are purchasing.
            </p>

          </div>


          <div className="feature">

            <div className="feature-number">
              02
            </div>

            <h3>
              VEHICLE COMPATIBILITY
            </h3>

            <p>
              Different engines can require different products. Octane-Link
              helps you explore products based on vehicle compatibility.
            </p>

            <p>
              Browse the catalog and check which vehicles are supported by
              each product.
            </p>

          </div>


          <div className="feature">

            <div className="feature-number">
              03
            </div>

            <h3>
              RELIABLE DELIVERY
            </h3>

            <p>
              Once you have selected your products, Octane-Link provides a
              convenient ordering experience.
            </p>

            <p>
              Delivery-related features help organize the process from order
              placement to receiving your products.
            </p>

          </div>

        </div>

      </section>


      {/* ================= VEHICLE STORY ================= */}

      <section className="story-section">

        <div className="story-text">

          <p className="section-label">
            BUILT FOR YOUR VEHICLE
          </p>

          <h2>
            FIND THE
            <br />
            RIGHT MATCH
          </h2>

          <p>
            Not every engine requires the same oil. Vehicle type, engine
            requirements, oil type, and manufacturer recommendations can all
            influence which product is suitable.
          </p>

          <p>
            Octane-Link makes this information easier to explore by providing
            compatibility details alongside product information.
          </p>

        </div>

        <div className="story-image">
          <img src={image3} alt="Petrol" />
        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-it-works">

        <div className="section-heading">

          <p className="section-label">
            HOW IT WORKS
          </p>

          <h2>
            FROM SEARCH
            <br />
            TO DELIVERY
          </h2>

          <p>
            Octane-Link keeps the purchasing process straightforward for
            customers looking for individual products or larger orders.
          </p>

        </div>


        <div className="steps">

          <div className="step">

            <span>
              01
            </span>

            <div>

              <h3>
                EXPLORE
              </h3>

              <p>
                Browse the product catalog and explore available engine oils
                and lubricants from different brands.
              </p>

            </div>

          </div>


          <div className="step">

            <span>
              02
            </span>

            <div>

              <h3>
                CHOOSE
              </h3>

              <p>
                Check product information, compatibility, price, and stock
                before selecting what works for your vehicle.
              </p>

            </div>

          </div>


          <div className="step">

            <span>
              03
            </span>

            <div>

              <h3>
                ORDER
              </h3>

              <p>
                Add your selected products to the cart and proceed through
                the ordering process.
              </p>

            </div>

          </div>


          <div className="step">

            <span>
              04
            </span>

            <div>

              <h3>
                DELIVER
              </h3>

              <p>
                Follow the order through the delivery process and receive your
                selected products conveniently.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section className="about">

        <div className="about-content">

          <p className="section-label">
            ABOUT OCTANE-LINK
          </p>

          <h2>
            KEEP YOUR ENGINE
            <br />
            RUNNING STRONG
          </h2>

          <p>
            Octane-Link is a fuel and lubricant marketplace designed to make
            purchasing engine oils and related products easier for both
            everyday vehicle owners and larger buyers.
          </p>

          <p>
            The platform brings product information, vehicle compatibility,
            ordering, and delivery features together so customers can spend
            less time searching and more time taking care of their vehicles.
          </p>

          <p>
            From common engine oils to products from different brands and
            grades, Octane-Link provides a central place to explore available
            options.
          </p>

          <Link
            to="/catalog"
            className="about-button"
          >
            Explore Catalog
          </Link>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="home-cta">

        <p className="section-label">
          YOUR VEHICLE DESERVES THE BEST
        </p>

        <h2>
          READY TO FIND
          <br />
          THE RIGHT OIL?
        </h2>

        <p>
          Explore the Octane-Link catalog and discover engine oils and
          lubricants for your vehicle.
        </p>

        <Link
          to="/catalog"
          className="hero-button"
        >
          Browse Catalog
        </Link>

      </section>

    </main>
  );
}

export default Home;
