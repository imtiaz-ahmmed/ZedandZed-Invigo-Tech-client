import { Children, useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return Children;
  }
  return <Navigate to="/"></Navigate>;
};

export default PrivateRoutes;
