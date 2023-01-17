import "./ProtectedUser.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../Contexts/userContext";
// import { useEffect } from "react";

const ProtectedUser = ({ children }) => {
  const { token } = useUserContext();
  const navigate = useNavigate();

  return token ? children : navigate("/");

  // useEffect(() => {
  //   console.log("token from ProtectedUser", token);
  //   return token ? children : navigate("/");
  // }, []);
};

export default ProtectedUser;
