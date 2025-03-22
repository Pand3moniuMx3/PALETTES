import "../styles/Homepage.css";
import { Link } from "react-router-dom";
import Iridescence from "../components/Iridescence";

export default function Homepage() {
  return (
    <section
      style={{
        height: "100vh",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <div className="container homepage">
        <h1 className="title">Palettes</h1>
        <Link to="/login" className="btn">
          Start
        </Link>
        <Link to="/login" className="login-btn">
          <img src="/icons/login-icon.svg" alt="login page" />
        </Link>
        <Link to="/about" className="info-btn">
          <img src="/icons/info-icon.svg" alt="info page" />
        </Link>
        <Link to="privacy-policy" className="privacy-btn">
          <img src="/icons/privacy-policy-icon.svg" alt="privacy policy" />
        </Link>
      </div>
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.2}
        speed={0.2}
      />
    </section>
  );
}
