import React from "react";
import "./ProtectedUser.css";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../../Contexts/userContext";

const ProtectedUser = ({ children }) => {
  const {token} = useUserContext();

  console.log("token", token);
  return token ? children : <Navigate to="/" />;
};

export default ProtectedUser;
