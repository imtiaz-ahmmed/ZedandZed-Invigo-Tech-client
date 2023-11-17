/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12 mb-4"></div>
        <p className="text-2xl font-bold text-blue-500">
          Zedandzed Invigo Tech
        </p>
      </div>
    );
  }

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
