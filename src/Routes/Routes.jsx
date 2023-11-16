import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Purchase from "../Pages/Services/Purchase/Purchase";
import Expense from "../Pages/Services/Expense/Expense";
import Adjustment from "../Pages/Services/Adjustment/Adjustment";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/home",
        element: (
          <PrivateRoutes>
            <Home></Home>
          </PrivateRoutes>
        ),
      },
      {
        path: "/",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/purchase",
        element: <Purchase></Purchase>,
      },
      {
        path: "/expense",
        element: <Expense></Expense>,
      },
      {
        path: "/adjustment",
        element: <Adjustment></Adjustment>,
      },
    ],
  },
]);
