import "./ProtectedUser.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../Contexts/userContext";
// import { useEffect } from "react";

const ProtectedUser = ({children}) => {
  const { token } = useUserContext();
  const navigate = useNavigate();
  console.log("token from protectedUser Outside of useEffect: ", token)
  // console.log("children: ", children);
  // useEffect(() => {
    console.log("token from protectedUser: ", token)
    // !token && navigate("/");
  // }, [token]);

  return token ? children : navigate("/");
};

export default ProtectedUser;
