import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddInventory from "../Pages/Services/AddInventory/AddInventory";
import ManageUser from "../Pages/Services/ManageUser/ManageUser";
import ManageInventory from "../Pages/Services/ManageInventory/ManageInventory";
import ViewInventory from "../Pages/Services/ViewInventory/ViewInventory";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes>
            <Home></Home>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: (
          <PrivateRoutes>
            <Register></Register>
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-inventory",
        element: (
          <PrivateRoutes>
            <AddInventory></AddInventory>
          </PrivateRoutes>
        ),
      },
      {
        path: "/manage-user",
        element: (
          <PrivateRoutes>
            <ManageUser></ManageUser>
          </PrivateRoutes>
        ),
      },
      {
        path: "/manage-inventory",
        element: (
          <PrivateRoutes>
            <ManageInventory></ManageInventory>
          </PrivateRoutes>
        ),
      },
      {
        path: "/view-inventory",
        element: (
          <PrivateRoutes>
            <ViewInventory></ViewInventory>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
