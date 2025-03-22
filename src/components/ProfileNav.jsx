import "../styles/Profile.css";
import { useLogout } from "../hooks/useLogout";
import SquareBtn from "./SquareBtn";
import { useNavigate } from "react-router-dom";

export default function ProfileNav() {
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <div className="profile-nav">
      <SquareBtn
        type="primary"
        icon="/icons/return-icon.svg"
        alt="return"
        onClick={() => navigate(-1)}
      />
      <SquareBtn
        type="secondary"
        icon="/icons/logout-icon.svg"
        alt="logout"
        onClick={logout}
      />
    </div>
  );
}
