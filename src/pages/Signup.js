import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Create Your VELNOR Account</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.loginText}>
          Already have an account? <span onClick={() => navigate("/login")} style={styles.link}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  box: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px"
  },
  heading: {
    color: "#ff0000",
    marginBottom: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    marginBottom: "15px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
  },
  button: {
    backgroundColor: "#ff0000",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  loginText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#333"
  },
  link: {
    color: "#ff0000",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: "5px"
  }
};

export default Signup;
