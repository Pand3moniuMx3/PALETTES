import "../styles/Badge.css";

export default function Badge({ customClass, children, onClick }) {
  return (
    <span className={`badge ${customClass}`} onClick={onClick}>
      {children}
    </span>
  );
}
