import "../styles/Message.css";

export default function Loader({ height = "100%", size = "big" }) {
  return (
    <div className="message" style={{ height: height }}>
      {size === "big" && (
        <img src="/icons/loader-icon.svg" alt="loading..." className="loader" />
      )}
      {size === "small" && (
        <img
          src="/icons/small-loader-icon.svg"
          alt="loading..."
          className="loader"
        />
      )}
    </div>
  );
}
