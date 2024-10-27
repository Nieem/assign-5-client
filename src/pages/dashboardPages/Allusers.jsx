import { useState, useEffect } from "react";
import { FaEdit, FaUserShield } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import {toast,Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isAdminToggleModalOpen, setIsAdminToggleModalOpen] = useState(false);
  const imageHostKey = import.meta.env.VITE_IMAGE_BB_API_KEY;

  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://assign-5-server.onrender.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Load users when the component mounts
  }, []);

  // Block a user
  const handleBlock = async () => {
    try {
      console.log({ selectedUser });
      const updatedUser = {
        ...selectedUser,
        isBlocked: !selectedUser?.isBlocked,
      };
      console.log({ updatedUser });

      await fetch(
        `https://assign-5-server.onrender.com/users/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      fetchUsers(); // Reload users after update
      setIsBlockModalOpen(false);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  // Toggle admin status
  const handleToggleAdmin = async () => {
    try {
      console.log({ selectedUser });
      const updatedUser = { ...selectedUser, isAdmin: !selectedUser?.isAdmin };
      console.log("toggle",{ updatedUser });
      await fetch(
        `https://assign-5-server.onrender.com/users/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      fetchUsers(); // Reload users after update
      setIsAdminToggleModalOpen(false);
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  // Open the edit modal with the user's current details
  const openEditModal = (user) => {
    console.log(user);
    setSelectedUser(user);
    setFormData({
      displayName: user.displayName || "",
      phone: user.phone || "",
      photoUrl: user.photoUrl || "",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  // Update user info
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...selectedUser,
        displayName: formData.displayName,
        phone: formData.phone,
        photoUrl: formData.photoUrl,
        address: formData.address,
      };


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
                        displayName: formData.displayName,
                        phone: formData.phone,
                        photoUrl: imgData.data.url,
                        address: formData.address,
                    }
                     console.log(profileUpdate);

                    // save product information to the database
                    fetch(`https://assign-5-server.onrender.com/users/${selectedUser._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(profileUpdate)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                           // toast.success(`user  updated successfully`);
                            fetchUsers();
                           // navigate('/dashboard/category')
                        })
                }
            })



      // await fetch(
      //   `https://assign-5-server.onrender.com/users/${selectedUser._id}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedUser),
      //   }
      // );


      fetchUsers(); // Reload users after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleClickedSetBlock = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };
  const handleClickedSetUserOrAdminRole = (user) => {
    setSelectedUser(user);
    setIsAdminToggleModalOpen(true);
  };

  return (
    <><Helmet>
      <title> BD BOOK ZONE | All Users</title>
    </Helmet>
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{user?.displayName || "N/A"}</td>
              <td className="py-2 px-4 border">{user?.email}</td>
              <td className="py-2 px-4 border">
                <img
                  src={user?.photoUrl || "https://via.placeholder.com/50"}
                  alt="user"
                  className="w-10 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="py-2 px-4 border">
                {user.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleClickedSetUserOrAdminRole(user)}
                  className={`mr-2 p-2 rounded-full text-white ${
                    user.isAdmin ? "bg-green-500" : "bg-blue-500"
                  } ${
                    user.email === "super-admin@dev-master.com"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  title="Toggle Admin/User"
                  disabled={user.email === "super-admin@dev-master.com"}
                >
                  <FaUserShield />
                </button>

                <button
                  onClick={() => openEditModal(user)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit User"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleClickedSetBlock(user)}
                  className={`p-2 rounded-full bg-red-500 text-white ${
                    user.email === "super-admin@dev-master.com"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  title="Block User"
                  disabled={user.email === "super-admin@dev-master.com"}
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
              />
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

      {/* Block Modal */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">
              {selectedUser.isBlocked
                ? "Unblock this user?"
                : "Block this user?"}
            </h3>
            <button
              onClick={handleBlock}
              className={`bg-red-500 text-white px-4 py-2 rounded ${
                selectedUser.isBlocked ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {selectedUser.isBlocked ? "Unblock" : "Block"}
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

      {/* Toggle Admin Modal */}
      {isAdminToggleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">
              {selectedUser.isAdmin
                ? "Revoke Admin Privileges?"
                : "Grant Admin Privileges?"}
            </h3>
            <button
              onClick={handleToggleAdmin}
              className={`bg-green-500 text-white px-4 py-2 rounded`}
            >
              {selectedUser.isAdmin ? "Revoke" : "Grant"}
            </button>
            <button
              onClick={() => setIsAdminToggleModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AllUsers;
