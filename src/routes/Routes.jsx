import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/Register";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import DashboardLayout from "../layout/Dashboard";
import Profile from "../pages/dashboardPages/Profile";
import AllUsers from "../pages/dashboardPages/Allusers";
import Product from "../pages/dashboardPages/Products";
import Products from "../pages/dashboardPages/Products";
import Addproducts from "../pages/dashboardPages/Addproducts";
import Category from "../pages/dashboardPages/Category";
import Addcategory from "../pages/dashboardPages/Addcategory";
import AllProduct from "../pages/allProducts";
import { ROUTES } from "../router";
import BookDetailspage from "../pages/productdetailspage";
import AllCategoryProduct from "../pages/allCategoryProduct";
import CheckoutPage from "../pages/dashboardPages/checkout";
// import HomeLayout from "../layout/HomeLayout";
// import HomePage from "../pages/HomePage";
// import PublicPage from "../pages/PublicPage";
// import PrivatePage from "../pages/PrivatePage";
// import LoginPage from "../pages/LoginPage";
// import PrivateRoute from "./PrivateRoute";
// import DashboardLayout from "../layout/DashboardLayout";
//import RegisterPage from "../pages/RegisterPage";
// import AllUsers from "../pages/dashboardPages/AllUsers";
// import Profile from "../pages/dashboardPages/Profile";
// import Messages from "../pages/dashboardPages/Messages";
// import CreateMessage from "../pages/dashboardPages/CreateMessages";
// import MessageDetails from "../pages/dashboardPages/MessageDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    //   {
    //     path: "/public",
    //     element: <PublicPage />,
    //   },
    //   {
    //     path: "/private",
    //     element: (
    //       <PrivateRoute>
    //         <PrivatePage />
    //       </PrivateRoute>
    //     ),
    //   },
       {
         path: "/login",
         element: <LoginPage />,
       },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
      {
        path: "/allbooks",
        element: <AllProduct/>,
      },

      {
        path:`${ROUTES.SINGLE_PRODUCTS.STATIC}`,
        element: <BookDetailspage/>
        ,
        loader: ({params}) =>
            // fetch(`https://assign-5-server.onrender.com/courseDetails`),
         fetch(`https://assign-5-server.onrender.com/products/${params.bookId}`),

   } ,
   {
    path:"/AllProductbyCategory/:category",
    element: <AllCategoryProduct/>
    ,
    loader: ({params}) =>
        // fetch(`https://assign-5-server.onrender.com/courseDetails`),
    //  fetch(`https://assign-5-server.onrender.com/products/${params.category}`),
     fetch(`https://assign-5-server.onrender.com/productsBycategory/${params.category}`),

} , 
    ],
  },
  {
     path: "/dashboard",
     element: <DashboardLayout />,
     children: [
       {
         path: "",
         element: <Profile />,
       },
       {
         path: "allUsers",
         element: <AllUsers/>,
       },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "addproduct",
        element: <Addproducts />,
      },
      {
        path: "category",
        element: <Category />,
      },

      {
        path: "addcategory",
        element: <Addcategory />,
      },

      {
        path: "checkout",
        element: <CheckoutPage />,
      },
//       {
//         path: "messages/:id",
//         element: <MessageDetails />,
//       },
//       {
//         path: "createMessage",
//         element: <CreateMessage />,
//       },
     ],
   },
]);

export default router;
