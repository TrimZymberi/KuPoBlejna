import React, { useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpineer from "../components/LoadingSpineer";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpineer />;
  }
  if (user) {
    return <div>{children}</div>;
  }

  return <Navigate to="/signup" state={{ from: location }} replace></Navigate>;
};

PrivateRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRouter;
