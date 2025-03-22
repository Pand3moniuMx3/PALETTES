import "../styles/SquareBtn.css";

export default function SquareBtn({
  type = "primary",
  icon,
  alt,
  onClick,
  customClass,
}) {
  return (
    <span className={`square-btn ${type} ${customClass}`} onClick={onClick}>
      <img src={icon} alt={alt} />
    </span>
  );
}
