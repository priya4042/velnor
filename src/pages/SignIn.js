// pages/SignIn.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to Home on successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign In</button>
        <p style={styles.signupText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "350px",
  },
  title: {
    color: "red",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    backgroundColor: "red",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  signupText: {
    textAlign: "center",
    marginTop: "15px",
  },
  link: {
    color: "red",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default SignIn;
