
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { Toaster,toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
const notify = () => toast.success('Here is your toast.');
const Addproducts = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [categoryObject, setCategoryObject] = useState({});
    const navigate = useNavigate();
   // useTitle('Add Product')
    const imageHostKey = import.meta.env.VITE_IMAGE_BB_API_KEY;

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {  category: '' }
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://assign-5-server.onrender.com/category');
                const data = await res.json();
                setCategories(data);

                // Create category object after fetching categories
                // as we need to insert category._id while adding product into DB.
                const tempCategoryObject = {};
                data.forEach(category => {
                    tempCategoryObject[category.name] = category._id;
                });
                //console.log(tempCategoryObject);
                setCategoryObject(tempCategoryObject);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(data);
                    const product = {
                        categoryId: categoryObject[data.category],
                        category: data.category,
                        image: imgData.data.url,
                        productName: data.name,
                        resalePrice: data.resalePrice,
                        postingTime: new Date(),
                        description: data.description,
                        status: 'available',
                    }

                    // save product information to the database
                    fetch('https://assign-5-server.onrender.com/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            
                           // navigate('/dashboard/products')
                        })
                }
            })


    }
    return (
        <><Helmet>
        <title> BD BOOK ZONE | Add Products</title>
      </Helmet>
        <div>
            
            <div className='w-10/12 p-7'>
                <h2 className="text-2xl text-[#FF652E] md:text-center text-left font-bold">Add a Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)} className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row">
                
                    <div>
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Product Name:</span></label>

                                <input type="text" {...register("name", {
                                    required: "Product Name is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
                        </div>

                        <div className='flex justify-center w-full max-w-xs items-center border p-2 border-indigo-400 mb-3'>
                            <div className="form-control w-11/12 max-w-xs mr-4 mt-1">
                                <label className="label"> <span className="label-text ">Resell Price</span></label>

                                <input type="text" {...register("resalePrice", {
                                    required: "Resell Price Required"
                                })} className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                                {errors.resalePrice && <p className='text-red-600 text-xs'>{errors.resalePrice.message}</p>}
                            </div>

                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center  max-w-xs'>
                                <label className="label"> <span className="label-text">Upload Photo:</span></label>
                                <input type="file" {...register("image", {
                                    required: "Photo is Required"
                                })} className="input input-bordered w-full max-w-xs p-1 rounded-none bg-white" />
                                {errors.image && <p className='text-red-500 text-xs'>{errors.image.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='ml-0 md:ml-12'>
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center  max-w-xs'>
                                <label className="label"> <span className="label-text">Product Category:</span></label>
                                <select
                                    {...register('category', {
                                        required: "Category is Required"
                                    })}

                                    className="input input-bordered w-full max-w-xs rounded-none text-sm bg-white">
                                    <option disabled value="">
                                        select category
                                    </option>
                                    {

                                        Object.keys(categoryObject)?.map((category, index) => <option
                                            key={index}
                                            value={category}>
                                            {category}</option>)
                                    }
                                </select>
                            </div>
                            {errors.category && <p className='text-red-500 text-xs'>{errors.category.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Description:</span></label>

                                <input type="text" {...register("description", {
                                    required: false
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                        </div>
                        <Toaster/>
                        <input className='btn btn-info md:w-80 w-64 rounded-none mt-1' value="Add Product" type="submit" />
                       

                    </div>
                </form>
                {/* <button onClick={notify}>Make me a toast</button> */}
                
            </div >
        </div >
        </>
    );
};

export default Addproducts;