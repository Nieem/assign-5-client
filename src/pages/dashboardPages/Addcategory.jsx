
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { Toaster,toast } from 'react-hot-toast';

const Addcategory = () => {
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


    const handleAddCategory = data => {
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
                        
                        image: imgData.data.url,
                        name: data.name,
                       
                    }

                    // save product information to the database
                    fetch('https://assign-5-server.onrender.com/category', {
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
                            //navigate('/dashboard/category')
                        })
                }
            })


    }
    return (
        <div>
            <div className='w-full p-7 bg-slate-400'>
                <h2 className="text-2xl text-[#562614] md:text-center text-left font-bold">Add a Category</h2>
                <form onSubmit={handleSubmit(handleAddCategory)} className=" justify-center border shadow-lg py-2 px-3 mt-3 flex flex-col md:flex-row">
                    <div>
                        <div className="form-control w-full max-w-sm border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Category Name:</span></label>

                                <input type="text" {...register("name", {
                                    required: "Product Name is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
                        </div>

                       

                        <div className="form-control w-full max-w-sm border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center  max-w-xs'>
                                <label className="label"> <span className="label-text">Upload Photo:</span></label>
                                <input type="file" {...register("image", {
                                    required: "Photo is Required"
                                })} className="input input-bordered w-full max-w-xs p-1 rounded-none bg-white" />
                                {errors.image && <p className='text-red-500 text-xs'>{errors.image.message}</p>}
                            </div>
                        </div>
                        <input className='btn btn-info md:w-80 w-64 rounded-none mt-1' value="Add Product" type="submit" />
                        <Toaster/>
                    </div>

                   
                       
                    
                </form>
            </div >
        </div >
    );
};

export default Addcategory;