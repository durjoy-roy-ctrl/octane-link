import "./splashScreen.css";
import logo from "../assets/images/logos/logo-bgless.png";


function SplashScreen() {
  return (
    <div className="splash-screen">

      <div className="splash-content">

        <img
          src={logo}
          alt="Octane-Link"
          className="splash-logo"
        />

        <h1>
          OCTANE<span>-</span>LINK
        </h1>

        <p>
          PREMIUM OILS & LUBRICANTS
        </p>

        <div className="splash-line"></div>

      </div>

    </div>
  );
}

export default SplashScreen;