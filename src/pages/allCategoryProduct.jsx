import React from 'react';
import { useState,useEffect } from 'react';
 //import axios from 'axios';
 //import jsondata from '../assets/book-data.json' 
import SingleProduct from '../components/shared/singleProduct.jsx';
import { useLoaderData } from 'react-router-dom';
import SingleProductAll from '../components/shared/singleProductAll.jsx';
import { Helmet } from 'react-helmet-async';

const  AllCategoryProduct = () => {
    const [category, setcategory] = useState([]);

    const productBycategory= useLoaderData();
    console.log(productBycategory);
    // const fetchCategory = async () => {
    //     try {
    //       const response = await fetch(
    //         "https://assign-5-server.onrender.com/category"
    //       );
    //       const data = await response.json();
    //       setcategory(data);
    //     } catch (error) {
    //       console.error("Error fetching users:", error);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchCategory(); 
    //   }, []);
     console.log(productBycategory);
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
        <><Helmet>
      <title> BD BOOK ZONE | All Produt By Category</title>
    </Helmet>
        <div className='container my-12 relative p-5'>
        <div className=' justify-center grid grid-cols-1 gap-2  lg:grid-cols-3 md:grid-cols-2'>
           { productBycategory.map((product) => ( 
                        <SingleProductAll key={product._id} product={product}/>

                    )) 

                }
        </div>
        </div>
        </>
    );
};
export default AllCategoryProduct;