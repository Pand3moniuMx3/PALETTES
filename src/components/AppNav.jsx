import { useNavigate } from "react-router-dom";
import SquareBtn from "./SquareBtn";

export default function AppNav() {
  const navigate = useNavigate();

  return (
    <div className="app-nav">
      <div className="btns-container">
        <SquareBtn
          type="secondary"
          icon="/icons/home-icon.svg"
          alt="log out"
          onClick={() => navigate("palettes")}
        />
      </div>
      <div className="btns-container">
        <SquareBtn
          type="secondary"
          icon="/icons/user-icon.svg"
          alt="profile"
          onClick={() => navigate("/profile")}
        />
        <SquareBtn
          type="primary"
          icon="/icons/plus-icon.svg"
          alt="open workshop"
          onClick={() => navigate("workshop")}
        />
      </div>
    </div>
  );
}
