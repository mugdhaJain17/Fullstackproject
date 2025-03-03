import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchProducts(storedUser.id);
    }
  }, []);

  const fetchProducts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError("Failed to fetch products.");
      }
    } catch (err) {
      setError("Error fetching products.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Your Profile</h1>
        {user ? (
          <div className="profile-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Link to="/add-product" className="add-product-btn">+ Add Product</Link> 
          </div>
        ) : (
          <p>No user data found. Please log in.</p>
        )}
      </div>

      <div className="products-container">
        <h2>Your Products</h2>
        {error && <p className="error">{error}</p>}
        <div className="products-list">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.prod_name} className="product-card">
                <img src={`http://localhost:5000/uploads/${product.img_path}`} alt={product.prod_name} className="product-image" />
                <div className="product-details">
                  <h3>{product.prod_name}</h3>
                  <p>{product.prod_desc}</p>
                  <p>Price: ₹{product.prod_price}</p>
                  <p>Stock: {product.prod_stock}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
