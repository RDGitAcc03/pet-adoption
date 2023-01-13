import React, { createContext, useContext, useEffect, useState } from "react";
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
      if (userData) {
        const { firstName, isAdmin, lastName, email, phoneNumber, bio, id } =
          userData.data;
        console.log("user connected: ", userData.data.firstName);
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
          console.log("user from UserContext: ", { firstName, isAdmin, lastName, email, phoneNumber, bio, id });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <userContext.Provider
      value={{
        token,
        setToken,
        userLoggedIn,
        setUserLoggedIn,
        allUsers,
        setAllUsers,
        getUserDetails
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
