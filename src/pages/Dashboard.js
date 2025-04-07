import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // ✅ add this
  const [editId, setEditId] = useState(null);

  const productCollection = collection(db, "products");

  const fetchProducts = async () => {
    const data = await getDocs(productCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title || !desc) return alert("Please fill all fields");

    let imageURL = null;

    if (image) {
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(imageRef);
    }

    if (editId) {
      const productRef = doc(db, "products", editId);
      await updateDoc(productRef, {
        title,
        description: desc,
        ...(imageURL && { imageURL }),
      });
      setEditId(null);
    } else {
      if (!imageURL) return alert("Please select an image");

      await addDoc(productCollection, {
        title,
        description: desc,
        imageURL,
      });
    }

    setTitle("");
    setDesc("");
    setImage(null);
    setImagePreview(null); // ✅ clear preview
    fetchProducts();
  };

  const handleEdit = (product) => {
    setTitle(product.title);
    setDesc(product.description);
    setEditId(product.id);
    setImagePreview(product.imageURL); // ✅ show existing image
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        📦 {editId ? "Edit Product" : "Add New Product"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={styles.input}
      />
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }}
        style={styles.input}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: 150, height: 150, marginTop: 10 }}
        />
      )}

      <button onClick={handleAddOrUpdate} style={styles.button}>
        {editId ? "Update Product" : "Add Product"}
      </button>

      <hr />

      <h2 style={styles.heading}>🛍️ Product List</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={product.imageURL}
              alt={product.title}
              style={styles.image}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button onClick={() => handleEdit(product)} style={styles.editBtn}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#fff",
    color: "#000",
  },
  heading: {
    color: "red",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "300px",
    border: "1px solid red",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "red",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    marginTop: "10px",
    marginLeft: "5px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  editBtn: {
    backgroundColor: "#FFA500",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    marginTop: "10px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  card: {
    width: "220px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
  },
};

export default Dashboard;
