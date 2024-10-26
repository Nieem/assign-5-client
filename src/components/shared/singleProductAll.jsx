import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router';

const SingleProductAll = (props) => {
 const {product}=props;
 
    return (
     <Link to={ROUTES.SINGLE_PRODUCTS.DYNAMIC(product._id)}>
    <div className="card card-compact bg-base-100  shadow-xl border-solid  border-2 border-x-gray-300 hover:border-x-red-500">
    <figure className="px-10 pt-10">
    <img
      src={product.image}
      alt="Shoes"
      className="rounded-xl h-40" />
  </figure>
  <div className="card-body items-center text-center -space-y-2">
    <h2 className="text-xl text-red-950 ">{product.productName}</h2>
     <span className='italic'>Price {product.resalePrice}</span>
    <p> Category : {product.category}</p>
    <p>Status:{product.status}</p> 
    <div className="card-actions">
      <button className="btn btn-accent mt-2">Course Details</button>
    </div>
  </div>
</div>
 </Link>
    );
};

export default SingleProductAll;