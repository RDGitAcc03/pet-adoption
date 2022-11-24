import { createContext, useContext, useEffect, useState } from "react";
import instance from "./axiosContext";


const userContext = createContext({});

export const useUserContext = () => {
  return useContext(userContext);
};

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const getUserDetails = async () => {
    try {
      // "http://localhost:8080/users/verifyLogin", { withCredentials: true }
      const userData = await instance.get("/users/verifyLogin");
      if (userData.data) {
        const { firstName, isAdmin, lastName, email, phoneNumber, bio, id } =
          userData.data;
        console.log("user connected: ", userData.data.id);
        if (userData.data) {
          setUserLoggedIn({
            id,
            firstName,
            isAdmin,
            lastName,
            email,
            phoneNumber,
            bio,
          });
          setToken(true);
          console.log("user from UserContext: ", {firstName, isAdmin, lastName, email, phoneNumber, bio, id});
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if(token) getUserDetails();
  }, [token]);

  return (
    <userContext.Provider
      value={{
        token,
        setToken,
        userLoggedIn,
        setUserLoggedIn,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
