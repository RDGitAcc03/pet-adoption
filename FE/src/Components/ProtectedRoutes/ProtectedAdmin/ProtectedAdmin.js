import "./ProtectedAdmin.css";
import { useUserContext } from "../../../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedAdmin = ({ children }) => {
  const { isAdmin } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/");
  }, [isAdmin, navigate]);

  return isAdmin && children;
};

export default ProtectedAdmin;
