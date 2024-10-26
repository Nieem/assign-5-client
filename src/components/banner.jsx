import React from 'react';
// import banner from "../assets/banner.jpg";


const Banner = () => {
    return (
//         <div>
//      <div className="hero bg-zinc-300 min-h-screen">
//   <div className="hero-content flex-col lg:flex-row-reverse">
//     <img
//       src={banner}
//       className="max-w-sm rounded-lg shadow-2xl max-h-64" />
//     <div>
//       <h1 className="text-5xl font-bold">Find Special!</h1>
//       <p className="py-3">
//       "Unlock a World of
//       Stories – Find Your Next Favorite Book at Brother's Book House.
//       </p>
//       <button className="btn btn-primary">Buy Book</button>
//     </div>
//   </div>
// </div>
//         </div>


<div
  className="hero min-h-screen -top-2"
  style={{
    backgroundImage:"url(/banner.jpg)",
 }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome!</h1>
      <p className="mb-5">
      ICT is generally used to represent a more comprehensive list of all components related to computer and digital technologies.
       IT is more about managing the technologies related to information, and its various technical aspects, including software, hardware, and networking..
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>



    );
};

export default Banner;