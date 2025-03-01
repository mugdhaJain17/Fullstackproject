// import { useState, useEffect } from "react";
// import axios from "axios";

// const FarmerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "" });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const addProduct = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/products", newProduct);
//       fetchProducts();
//       setNewProduct({ name: "", price: "" });
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>
//       <div className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Product Name"
//           className="border p-2 rounded"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="border p-2 rounded"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//         />
//         <button onClick={addProduct} className="bg-green-500 text-white p-2 rounded">
//           Add Product
//         </button>
//       </div>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id} className="flex justify-between p-2 border-b">
//             <span>{product.name} - ₹{product.price}</span>
//             <button onClick={() => deleteProduct(product.id)} className="text-red-500">Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FarmerDashboard;
