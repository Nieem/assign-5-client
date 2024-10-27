import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router';

const SingleProduct = (props) => {
 const {category}=props;
 console.log(category._id);
 
    return (
    //  <Link to={ROUTES.SINGLE_PRODUCTS.DYNAMIC(category.name)}>
    <Link to={`/AllProductbyCategory/${category._id}`}>
    <div className="card card-compact bg-base-100  shadow-xl border-solid  border-2 border-x-gray-300 hover:border-x-red-500">
    <figure className="px-10 pt-10">
    <img
      src={category.image}
      alt="Shoes"
      className="rounded-xl h-40" />
  </figure>
  <div className="card-body items-center text-center -space-y-2">
    <h2 className="text-xl text-red-950 ">{category.name}</h2>
    {/* <span className='italic'>By {course.lession}</span>
    <p> Price : {course.price}</p>
    <p>{course.level}</p> */}
    <div className="card-actions">
      <button className="btn btn-accent mt-2">View All</button>
    </div>
  </div>
</div>
 </Link>
    );
};

export default SingleProduct;