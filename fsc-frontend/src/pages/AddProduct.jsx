import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("prod_name", product.name);
    formData.append("prod_price", product.price);
    formData.append("prod_desc", product.description);
    formData.append("user_id", "1");
    formData.append("prod_stock", product.stock);
    formData.append("image", product.image);

    try {
      const response = await fetch("http://localhost:5000/api/add-product", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        setProduct({ name: "", price: "", description: "", stock: "", image: null });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />

        <label>Product Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
