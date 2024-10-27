import { useState,useEffect } from 'react';
import React from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import {useContext} from 'react';
import { FaEdit } from 'react-icons/fa';

const CheckoutPage = () => {
    const [buyProducts, setbuyProducts] = useState([]);
    const [currentUser, setcurrentUser] = useState(false);
    const [Total, setTotal] = useState(0);
    const { user } = useContext(AuthContext);
      console.log(user);
      
      
    const viewBuyProduct = async () => {
        try {     
          const response = await fetch(
            `http://localhost:5000/userBuyproducts/${user.uid}`
          );
          const data = await response.json();
          setbuyProducts(data);
          
        
        }
         catch (error) {
          console.error("Error fetching users:", error);
        }
        setcurrentUser(true);
      };
    
      console.log(buyProducts);

      useEffect(() => {
       // setcurrentUser(user);
       if(user){
       // fetchBuyProducts(); 

      }
       }, []);
       console.log(currentUser);
       let total=0;
    const calsum= () =>{
        buyProducts.forEach(x => {
            total += parseInt(x.productPrice);
            console.log(total)
            setTotal(total)
        });
     }


      // function increment() {
        //setCount(prevCount => prevCount+=1);
       // setCount(function (prevCount) {
        //  return (prevCount += 1);
       // });
     // }
    
    //   function decrement() {
    //     setCount(function (prevCount) {
    //       if (prevCount > 0) {
    //         return (prevCount -= 1); 
    //       } else {
    //         return (prevCount = 0);
    //       }
    //     });
    //   }

    return (

<div className="container mx-auto p-4">   
    <div className='flex flex-col items-center justify-center mt-3'>
   <button className="btn btn-success btn-block" onClick={() => viewBuyProduct()}> Click to Checkout</button>
   </div>
       
   {currentUser && ( <h2 className="text-2xl font-bold mb-4 text-center">Product List</h2>  )}    
<table className="min-w-full bg-white border">
     <thead>
     {currentUser && (
       <tr className="bg-gray-200 text-gray-600 text-left">
         <th className="py-2 px-4 border">#</th>
         <th className="py-2 px-4 border">Name</th>
         <th className="py-2 px-4 border">Image</th>
         <th className="py-2 px-4 border">Price</th>
         
       </tr>
     )}
     </thead>
     <tbody>
       {buyProducts.map((products, index) => (
         <tr key={products._id} className="hover:bg-gray-100">
           <td className="py-2 px-4 border">{index + 1}</td>
           <td className="py-2 px-4 border">{products?.productName}</td>
           <td className="py-2 px-4 border">
             <img
               src={products?.productImage || "https://via.placeholder.com/50"}
               alt="user"
               className="w-10 rounded-full"
             />
           </td>
           <td className="py-2 px-4 border">{products?.productPrice}</td>
           {/* <td className="py-2 px-4 border">
           <button className='btn btn-info' onClick={increment}>+</button>
           {count}
           <button className='btn btn-warning' onClick={decrement}>-</button>
           </td> */}         
         </tr>
       ))}
      {currentUser && ( <tr>
       <td>  <button className='btn btn-neutral' onClick={calsum}>Calculate</button></td>
       <td>Total</td>
       <td></td>
       <td>{Total}</td>
       </tr>)}
     </tbody>
   </table>
  
   {currentUser &&(  <div className='flex flex-col items-center justify-center mt-3'>
   <button className="btn btn-secondary">Go Payment</button>
   </div>)}
   
   </div>
    );
};

export default CheckoutPage;