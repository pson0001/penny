// SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import PageContainer from "../../components/pageContainer/PageContainer";
import Penny from "../../assets/penny.svg";
import c from "./sign-in.module.scss";

// const Penny =

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={c.signInContainer}>
      <div>
        <div className={c.illustration}>
          <img src={Penny} alt="My SVG" />
        </div>
        <div className={c.title}>
          <h1>Hello, I am Penny.</h1>
          <span>Please sign in to our houses.</span>
        </div>
        <form onSubmit={handleSignIn} className={c.formContainer}>
          <div className={c.field}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={c.field}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
