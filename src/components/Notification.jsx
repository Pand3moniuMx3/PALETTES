import "../styles/Notification.css";

export default function Notification({ message, type = "positive", onClose }) {
  return (
    <div className={`notification ${type} ${message && "active"}`}>
      <div className="content">
        <div className="top-info">
          <b>Notification</b>
          <img
            src="/icons/small-close-icon.svg"
            alt="close notification"
            onClick={onClose}
          />
        </div>
        <p>{message}</p>
      </div>
      <div className="progress-track">
        <span className="progress-bar" />
      </div>
    </div>
  );
}
