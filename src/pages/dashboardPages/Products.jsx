import React from 'react';
import { useState, useEffect } from "react";
import { FaEdit, FaUserShield } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);



  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    image: "",
    resalePrice: "",
    description:"",
    status:""
  });

  // Fetch all Products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/products"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Load users when the component mounts
  }, []);


// Open the edit modal with the user's current details
const openEditModal = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setFormData({
        productName:product.productName || "",
        category:product.category ||"",
        image: product.image || "",
        resalePrice:product.resalePrice || "",
        description:product.description || "",
        status:product.status || ""
    });
    setIsEditModalOpen(true);
  };


  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        ...selectedProduct,
        productName:formData.productName,
        category:formData.category,
        image: formData.image,
        resalePrice:formData.resalePrice,
        description:formData.description,
        status:formData.status
      };

      await fetch(
        `http://localhost:5000/products/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      fetchProducts(); // Reload product after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const handleClickedSetBlock = (user) => {
    setSelectedProduct(user);
    setIsBlockModalOpen(true);
  };

// Block a user
const handleBlock = async () => {
    try {
      console.log({ selectedProduct });
      const DeleteProduct = {
        ...selectedProduct
      };
      console.log({ DeleteProduct });

      await fetch(
        `http://localhost:5000/products/${selectedProduct._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DeleteProduct),
        }
      );
      fetchProducts(); // Reload users after update
      setIsBlockModalOpen(false);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };
  
    return (
        <div className="container mx-auto p-4">
           <h2 className="text-2xl font-bold mb-4">Products List</h2>
             <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Product Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Reseal Price</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{product?.productName || "N/A"}</td>
              <td className="py-2 px-4 border">{product?.category}</td>
              <td className="py-2 px-4 border">
                <img
                  src={product?.image || "https://via.placeholder.com/50"}
                  alt="user"
                  className="w-10 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border">{product?.resalePrice || "N/A"}</td>
              <td className="py-2 px-4 border">{product?.description}</td>
              <td className="py-2 px-4 border">
                {product.status}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => openEditModal(product)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit User"
                >
                  <FaEdit />
                </button>
               
                <button
                  onClick={() => handleClickedSetBlock(product)}
                  className={`p-2 rounded-full bg-red-500 text-white`}
                  title="Block User"
                >
                  <ImBlocked />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



     {/* Edit Modal */}
     {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit Product</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Product Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Category:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Resale Price:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.resalePrice}
                onChange={(e) =>
                  setFormData({ ...formData, resalePrice: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Description:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Status:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


 {/* delete Modal */}
 {isBlockModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">
              {"Delete this product?"}
            </h3>
            <button
              onClick={handleBlock}
              className={`bg-red-500 text-white px-4 py-2 rounded `} >
              {"Delete"}
            </button>
            <button
              onClick={() => setIsBlockModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


        </div>
    );
};

export default Products;