import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import   jsondata from "../assets/book-data.json";
///import { toast,ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../provider/AuthProvider';
import { useContext } from 'react';
 import { useLoaderData } from 'react-router-dom';

const BookDetailspage = () => {
  const [bookdetails,setbookdetail]=useState([]);
  const productDetails = useLoaderData();

  const { user } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });
 // setbookdetail(productDetails);
  //const  products=productDetails.json();
  console.log("data",productDetails.description);
   
    // const bookID= useParams();
    // console.log(bookID);

    // const notify = () => 
    //   {
    //     courses?.map((course)=> (
        
    //     toast(course.title+', '+course.price+" has Successfully Added to the Wise List")));

    //   }

    // const getBookById=()=>{
    //     const loadData=[...jsondata];
    //     const filterdata=loadData.filter(b=>b.bookId==bookID.bookId);
    //     setbookdetail(filterdata);
    //     //console.log(loadData);
    //     console.log(bookdetails);
    // }

   

// useEffect(()=>{
// getBookById();
// },[])

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


const handleOpenEditModal = () => {
  setSelectedUser(user);
  setFormData({
    displayName: user.displayName || "",
    phone: user.phone || "",
    email:user.email || "",
    //photoUrl: user.photoUrl || "",
    address: user.address || "",
  });
  setIsEditModalOpen(true);
};

    return (
        <div className='my-3'>
          



<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row px-7">
    <img
      src={productDetails.image}
      className="w-full rounded-lg shadow-2xl lg:w-1/2" />
    <div>
      <h1 className="text-5xl font-bold">{productDetails.productName}</h1>
      <p className="py-6 ml-2">
        <span className='font-bold'>Details:</span><span className='italic'> {productDetails.description}</span> &nbsp;
        <span className='font-bold'>Lession:</span> <span>{productDetails.category}</span>&nbsp;
        <span className='font-bold'>price:</span> <span> {productDetails.resalePrice}</span>&nbsp;
      </p>
      {/* <button className="btn btn-primary" onClick={notify}>Wise to Read</button>*/}
      <button className="btn btn-accent ms-2" onClick={handleOpenEditModal}>Add to Cart</button> 
      {/* <ToastContainer/> */}
    </div>
  </div>
</div>

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
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
            disabled  />
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
              Add to Checkout
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
           {/* <Toaster/> */}
          </div>
        </div>
      )}



  </div>
    ); 
  }
export default BookDetailspage;