import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import   jsondata from "../assets/book-data.json";
///import { toast,ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../provider/AuthProvider';
import { useContext } from 'react';
 import { useLoaderData } from 'react-router-dom';
 import { Helmet } from 'react-helmet-async';

const BookDetailspage = () => {
  const [bookdetails,setbookdetail]=useState([]);
  const productDetails = useLoaderData();

  const { user } = useContext(AuthContext);
  console.log("user",user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isproductBuyModalOpen, setisproductBuyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });
 // setbookdetail(productDetails);
  //const  products=productDetails.json();
  console.log("data",productDetails);
   
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

 // buy product
 const handleUpdate = async () => {

  
  try {
    const updatedUser = {
      //...selectedUser,
     // displayName: formData.displayName,
      productId:formData.productId,
      productPrice:formData.productPrice,
      productName:formData.productName,
      uid:user.uid,
      address: formData.address,
      phone: formData.phone,
      productImage:productDetails.image,
      buyTime:new Date()
      //photoUrl: formData.photoUrl,
      
      
    };

    console.log(updatedUser);

    await fetch(
      `http://localhost:5000/userBuyproducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );
   // fetchUsers(); // Reload users after update
   setisproductBuyModalOpen(false);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
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


const handleOpenEditModal = () => {
  setSelectedUser(user);
  console.log(user);
  setFormData({
    displayName: user.displayName || "",
    phone: user.phone || "",
    email:user.email || "",
   // image: productDetails.photoUrl || "",
    address: user.address || "",
    productId:productDetails._id,
    productName:productDetails.productName,
    productPrice:productDetails.resalePrice,

  });

  setisproductBuyModalOpen(true);
};

    return (
      <><Helmet>
      <title> BD BOOK ZONE | Books Details</title>
    </Helmet>
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
 {isproductBuyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-3 text-center font-bold">Buy Book</h3>
            <div className="mb-2">
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
            <div className="mb-2">
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
            <div className="mb-2">
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
            <div className="mb-2">
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
            <div className="mb-2">
              <label className="block text-sm font-medium">Product Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
             disabled />
              
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.productPrice}
                onChange={(e) =>
                  setFormData({ ...formData, productPrice: e.target.value })
                }
             disabled />
            </div>

            <div className="mb-4" hidden>
              <label className="block text-sm font-medium">Product Id:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
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
              onClick={() => setisproductBuyModalOpen(false)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
           {/* <Toaster/> */}
          </div>
        </div>
      )}



  </div>
  </>
    ); 
  }
export default BookDetailspage;