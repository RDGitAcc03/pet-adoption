import "./ProtectedAdmin.css";
import { Navigate} from "react-router-dom";
import React from "react";
import { useUserContext } from "../../../Contexts/userContext";

const ProtectedAdmin = ({ children }) => {
  const {isAdmin} = useUserContext(); 
  
  console.log("isAdmin from protectedAdmin", isAdmin);
  return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedAdmin;
