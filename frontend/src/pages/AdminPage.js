import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update
      await axios.put(
        `http://localhost:5000/api/products/update/${editingId}`,
        form
      );
      setEditingId(null);
    } else {
      // Add new
      await axios.post("http://localhost:5000/api/products/add", form);
    }

    setForm({ name: "", category: "", price: "", image: "", description: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Delete failed:", err.message);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Panel</h2>

      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        /> <br/>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        /> <br/>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          required
        /> <br/>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        /><br/>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        /><br/>
        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h3>All Products</h3>
      {products.map((p) => (
        <div
          key={p._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <img src={p.image} alt={p.name} width="100" />
          <h4>{p.name}</h4>
          <p>
            {p.category} | ₹{p.price}
          </p>
          <button onClick={() => handleDelete(p._id)}>❌ Delete</button>
          <button onClick={() => handleEdit(p)}>✏️ Edit</button>

        </div>
      ))}
    </div>
  );
};

export default AdminPage;
