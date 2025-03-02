import React, { useEffect, useState } from 'react';
import HomeImage from '../assets/HomeImage.png';
import './Home.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products"); // Update with your API URL
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={HomeImage} alt="Hero Image" className="hero-image" />
      </div>

      {/* Header Section */}
      <div className="home-header">
        <p className="intro-text">Your one-stop shop for fresh, locally sourced products.</p>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <h2>Featured Products</h2>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={`http://localhost:5000/uploads/${product.img_path}`} alt={product.prod_name} className="product-image" />
                <h3>{product.prod_name}</h3>
                <p className="product-price">₹{product.prod_price}</p>
                <p>{product.prod_desc}</p>
                <button className="buy-btn">Buy Now</button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Shop</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: <a href="mailto:support@localfarmers.com">support@localfarmers.com</a></p>
            <p>Phone: +91 94635 63971</p>
            <p>Address: 123 Farmer's Street, Agri Town, India</p>
          </div>

          <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target='blank'><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/" target='blank'><i className="fa-brands fa-instagram"></i></a>
            <a href="https://x.com/" target='blank'><i className="fa-brands fa-twitter"></i></a>
            <a href="https://in.linkedin.com/" target='blank'><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Local Farmers' Market. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
