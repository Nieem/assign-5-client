import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FiEdit } from "react-icons/fi"; // Importing react-icon
import {Toaster,toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const Profile = () => {
  const { user } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });

  const imageHostKey = import.meta.env.VITE_IMAGE_BB_API_KEY;

  const navigate=useNavigate();
  // Update user info
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...user,
        displayName: formData.displayName,
        phone: formData.phone,
        photoUrl: formData.photoUrl,
        address: formData.address,
      };

      console.log(updatedUser)
      // Make API call to update user information


      const formdata=new FormData();
      formdata.append('image', formData.photoUrl);

      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                     console.log(imgData.data.url);

                    const profileUpdate = {
                          ...user,
                        displayName: formData.displayName,
                        phone: formData.phone,
                        photoUrl: imgData.data.url,
                        address: formData.address,
                    }
                     console.log(profileUpdate);

                    // save product information to the database
                    fetch(`https://assign-5-server.onrender.com/users/${user._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(profileUpdate)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`Profile  updated successfully`);
                           // navigate('/dashboard/category')
                        })
                }
            })
      // const response = await fetch(
      //   `https://assign-5-server.onrender.com/users/${user._id}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedUser),
      //   }
      // ) .then(res => res.json())
      // .then(result => {
      //     console.log(result);
      //     toast.success(`Profile Updated successfully`);
          
      //     navigate('/dashboard/')
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to update user information");
      // }

      // Close the modal upon successful update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      //alert("There was an error updating the user. Please try again.");
    }
  };

  // Open the edit modal with the user's current details
  const handleOpenEditModal = () => {
    setSelectedUser(user);
    setFormData({
      displayName: user.displayName || "",
      phone: user.phone || "",
      photoUrl: user.photoUrl || "",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg relative">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoUrl}
          alt="Profile"
          className="w-36 h-36 object-cover rounded-full shadow-md"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.displayName}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
        <div>
          <strong
            className={!user?.isBlocked ? "text-green-500" : "text-red-500"}
          >
            {!user?.isBlocked ? "Active" : "Blocked"}
          </strong>
        </div>
      </div>

      <div className="mt-6 w-full">
        <h3 className="text-xl font-bold text-gray-700">Profile Details</h3>
        <hr />
        <ul className="mt-3 text-gray-600 space-y-2">
          <li>
            <strong>Role:</strong> {user?.isAdmin ? "Admin" : "User"}
          </li>
          <li>
            <strong>Email:</strong> {user?.email}
          </li>
          <li>
            <strong>Phone:</strong> {user?.phone || "N/A"}
          </li>
          <li>
            <strong>Address:</strong> {user?.address || "N/A"}
          </li>
          <hr />
          <li>
            <strong>Unique ID:</strong> {user?.uid}
          </li>
        </ul>
        <Toaster/>
      </div>

      {/* Edit Button with React Icon */}
      {!user?.isBlocked ? (
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition-transform transform hover:scale-105"
          onClick={handleOpenEditModal}
        >
          <FiEdit size={24} />
        </button>
      ) : null}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit User</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                //value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, photoUrl: e.target.files[0] })
                }
            required  />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Address:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              
            </div>
           
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
           <Toaster/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
