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
//       {
//         path: "messages",
//         element: <Messages />,
//       },
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
