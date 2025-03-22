import { useState } from "react";
import "../styles/Authentication.css";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { signup } = useSignup();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    signup(
      { username, occupation, email, password },
      {
        onSettled: navigate("/login"),
      }
    );
  }

  return (
    <section className="page login">
      <form>
        <h3>Sign up</h3>
        <div
          className={`input-wrapper ${username !== "" && "active"}
          }`}
        >
          <img src="/icons/user-icon.svg" alt="enter username" />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div
          className={`input-wrapper ${occupation !== "" && "active"}
          }`}
        >
          <img src="/icons/occupation-icon.svg" alt="enter occupation" />
          <input
            type="text"
            placeholder="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>
        <div
          className={`input-wrapper ${email !== "" && "active"}
          }`}
        >
          <img src="/icons/email-icon.svg" alt="enter your email" />
          <input
            type="text"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className={`input-wrapper ${password !== "" && "active"}
          }`}
        >
          <img src="/icons/lock-icon.svg" alt="create a password" />
          <input
            type="password"
            placeholder="create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {password && (
          <div
            className={`input-wrapper ${passwordRepeat && "active"} ${
              passwordRepeat !== password && "incorrect"
            }
          }`}
          >
            <img src="/icons/lock-icon.svg" alt="repeat the password" />
            <input
              type="password"
              placeholder="repeat password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
        )}
        <button
          className={`btn ${
            !username ||
            !occupation ||
            !email ||
            !password ||
            !passwordRepeat ||
            password !== passwordRepeat
              ? "disabled"
              : ""
          }`}
          style={{ width: "100%" }}
          onClick={onSubmit}
        >
          {" "}
          Sign up
        </button>
      </form>
    </section>
  );
}
