import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Authentication.css";
import { useLogin } from "../hooks/useLogin";
import TextInput from "../components/TextInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <section className="page login">
      <form>
        <h3>Log in</h3>
        <TextInput
          value={email}
          onChange={setEmail}
          placeholder="email"
          disabledCondition={isLoading}
        >
          <img src="/icons/email-icon.svg" alt="enter username" />
        </TextInput>
        <TextInput
          value={password}
          onChange={setPassword}
          placeholder="password"
          disabledCondition={isLoading}
        >
          <img src="/icons/lock-icon.svg" alt="enter username" />
        </TextInput>
        <button
          className="btn"
          style={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {" "}
          Log in
        </button>
        <p>Or</p>
        <Link to="/sign-up" className="btn secondary" style={{ width: "100%" }}>
          Sign up
        </Link>
      </form>
    </section>
  );
}
