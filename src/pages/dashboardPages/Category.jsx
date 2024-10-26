import React from 'react';
import { useState, useEffect } from "react";
import { FaEdit, FaUserShield } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { Toaster,toast } from 'react-hot-toast';

const Category = () => {
  const [Category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const imageHostKey = import.meta.env.VITE_IMAGE_BB_API_KEY;

  const [formData, setFormData] = useState({
    name: "",
    image:null,
    
  });

  // Fetch all Category from the backend
  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "https://assign-5-server.onrender.com/category"
      );
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchCategory(); // Load users when the component mounts
  }, []);


// Open the edit modal with the user's current details
const openEditModal = (category) => {
    console.log(category);
    setSelectedCategory(category);
    setFormData({
        name:category.name || "",
       // image: category.image || "",
        
    });
   

    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedCategory = {
        ...selectedCategory,
        name:formData.name,
        image: formData.image,
        
      };

      const formdata=new FormData();
      formdata.append('image', formData.image);

      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                     console.log(imgData.data.url);

                    const category = {
                        image: imgData.data.url,
                        name: formData.name,
                    }

                    // save product information to the database
                    fetch(`https://assign-5-server.onrender.com/category/${selectedCategory._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(category)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`Category  updated successfully`);
                            fetchCategory();
                           // navigate('/dashboard/category')
                        })
                }
            })

    //   await fetch(
    //     `https://assign-5-server.onrender.com/category/${selectedCategory._id}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(updatedCategory),
    //     }
    //   );
       // Reload product after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const handleClickedSetBlock = (category) => {
    setSelectedCategory(category);
    setIsBlockModalOpen(true);
  };

//Block a user
const handleBlock = async () => {
    try {
      console.log({ selectedCategory });
      const DeleteCategory = {
        ...selectedCategory
      };
      console.log({ DeleteCategory });

      await fetch(
        `https://assign-5-server.onrender.com/category/${selectedCategory._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DeleteCategory),
        }
      );
      fetchCategory(); // Reload users after update
      setIsBlockModalOpen(false);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };
  
    return (
        <div className="container mx-auto p-4">
           <h2 className="text-2xl font-bold mb-4 text-center">Category List</h2>
           <p className='text-right text-amber-900 font-bold'>add category <button
                  onClick={() => openAddModal()}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit User"
                > 
                  <FaEdit />
                </button> </p>
             <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Category Name</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Category.map((category, index) => (
            <tr key={category._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{category?.name}</td>
              <td className="py-2 px-4 border">
                <img
                  src={category?.image || "https://via.placeholder.com/50"}
                  alt="user"
                  className="w-10 rounded-full"
                />
              </td>
             
              <td className="py-2 px-4 border">
                <button
                  onClick={() => openEditModal(category)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit User"
                >
                  <FaEdit />
                </button>
               
                <button
                  onClick={() => handleClickedSetBlock(category)}
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
            <h3 className="text-xl mb-4">Edit Category</h3>
            <div className="mb-4">
              <label className=" block text-sm font-medium">Category Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.name })
                }
              />
            </div>
           
            <div className="mb-4">
              <label className=" block text-sm font-medium">Photo URL:</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                //value={formData.image}
                 onChange={(e) =>
                   setFormData({ ...formData, image: e.target.files[0] })
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
            <Toaster/>
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

export default Category;