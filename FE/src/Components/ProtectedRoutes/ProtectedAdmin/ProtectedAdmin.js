import "./ProtectedAdmin.css";
import { useUserContext } from "../../../Contexts/userContext";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const ProtectedAdmin = ({ children }) => {
  const { isAdmin } = useUserContext();
  const navigate = useNavigate();

  console.log("isAdmin from protectedAdmin", isAdmin);
  return isAdmin ? children : navigate("/");

  // useEffect(() => {
  //   return isAdmin ? children : navigate("/");
  // }, [])
};

export default ProtectedAdmin;
