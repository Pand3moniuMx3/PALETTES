import { useNavigate } from "react-router-dom";
import { useEyeOfRah } from "../context/EyeOfRahContext";

export default function EyeOfRah() {
  const navigate = useNavigate();
  const { message } = useEyeOfRah();

  function handleClick() {
    if (message) return;
    navigate("/app/palettes");
  }

  return (
    <button
      className="btn secondary"
      onClick={handleClick}
      disabled={Boolean(message)}
    >
      {message || "Palettes"}
    </button>
  );
}
