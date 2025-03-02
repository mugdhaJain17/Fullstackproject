// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './Profile1.css';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const response = await fetch('http://localhost:5000/user-details', {
//             method: 'GET',
//             headers: { 'Authorization': Bearer ${token} },
//           });
//           const data = await response.json();
//           setUser(data);
//           setRole(data.role);
//           setSelectedAvatar(data.avatarId || 'https://via.placeholder.com/150');
//         } catch (err) {
//           console.error('Failed to fetch user details', err);
//         }
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const handleDeleteAccount = async () => {
//     if (!window.confirm('Are you sure you want to delete your account?')) return;

//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:5000/delete-account', {
//         method: 'DELETE',
//         headers: { 'Authorization': Bearer ${token} },
//       });
//       const data = await response.json();
//       if (data.message) {
//         alert('Account deleted successfully');
//         localStorage.removeItem('token');
//         navigate('/');
//       } else {
//         alert('Failed to delete account');
//       }
//     } catch (err) {
//       console.error('Error deleting account:', err);
//       alert('Failed to delete account');
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>{role === 'farmer' ? 'Farmer' : 'Customer'} Profile</h1>
//       <div className="profile-details">
//         <div className="profile-avatar-container">
//           <img src={selectedAvatar} alt="Avatar" className="profile-avatar" />
//         </div>
//         <p><strong>Name:</strong> {user.fullName}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Mobile:</strong> {user.mobile}</p>
//         <p><strong>Role:</strong> {role}</p>
//       </div>
//       <div className="profile-actions">
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         <button className="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;