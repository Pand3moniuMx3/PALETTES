export default function Message({ message, customStyles }) {
  const messageStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...customStyles,
  };

  return (
    <div style={messageStyle}>
      <h3 style={{ color: "var(--clr-light)" }}>{message}</h3>
    </div>
  );
}
