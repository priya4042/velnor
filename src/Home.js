import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Welcome to Velnor Store 👕</h1>
      <p>This is your home page after login.</p>
      <button onClick={logout} style={{ background: "red", color: "#fff", padding: "10px 20px", border: "none" }}>
        Logout
      </button>
    </div>
  );
}

export default Home;
