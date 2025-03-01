import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css"; // ✅ Import CSS

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser); // ✅ Debugging Log

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className="profile-container">
      <h1>Welcome to Your Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>

          <Link to="/add-product" className="add-product-button">
            ➕ Add New Product
          </Link>
        </div>
      ) : (
        <p>No user data found. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
