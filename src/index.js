// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from './context/CartContext'; // ✅ Make sure this path is correct

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
  <CartProvider>
    <App />
  </CartProvider>
</React.StrictMode>
  </AuthProvider>
);
