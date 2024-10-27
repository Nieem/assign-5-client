import React from 'react';
import { useState,useEffect } from 'react';
 //import axios from 'axios';
 //import jsondata from '../assets/book-data.json' 
import SingleProductAll from '../components/shared/singleProductAll';
//import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const  AllProduct = () => {
    const [products, setproducts] = useState([]);
    const fetchProducts = async () => {
        try {
          const response = await fetch(
            "https://assign-5-server.onrender.com/products"
          );
          const data = await response.json();
          setproducts(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      useEffect(() => {
        fetchProducts(); // Load users when the component mounts
      }, []);
     console.log(products);
    // const [bookList, setBookList] = useState([]); 
    // const getAllBooks= async ()=>{
    //    // const data = await axios.get("../assets/book-data.json"); 
    //    const loadData=[...jsondata];
    //    console.log(loadData);
    //     setBookList(loadData); 
    // }
    // useEffect(() => { 
    //     getAllBooks();  
    //   }, []); 


    return (
        <>
        <Helmet>
        <title> BD BOOK ZONE | All Books</title>
      </Helmet>
        <div className='container my-12 relative p-7'>
        <div className=' justify-center grid grid-cols-1 gap-2  lg:grid-cols-3 md:grid-cols-2'>
           { products.map((product) => ( 
                        <SingleProductAll key={product._id} product={product}/>

                    )) 

                }
        </div>
        </div>
        </>
    );
};
export default AllProduct;