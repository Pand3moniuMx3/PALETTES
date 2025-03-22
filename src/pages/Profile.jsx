import "../styles/Profile.css";

export default function Profile({ children }) {
  return (
    <section>
      <div className="container profile">{children}</div>
    </section>
  );
}
