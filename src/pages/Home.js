// pages/Home.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ✅ grab addToCart from context

  const fetchProducts = async () => {
    const data = await getDocs(collection(db, "products"));
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h1>🛍️ Shop Now</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.imageURL} alt={product.title} style={styles.image} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)} style={styles.button}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" },
  card: { width: "220px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" },
  image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" },
  button: { marginTop: "10px", padding: "8px 12px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default Home;
