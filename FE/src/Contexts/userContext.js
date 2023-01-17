import React, { createContext, useContext, useEffect, useState } from "react";
import instance from "./axiosContext";


const userContext = createContext({});

export const useUserContext = () => {
  return useContext(userContext);
};

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const getUserDetails = async () => {
    try {
      const userData = await instance.get("/users/verifyLogin");
      if (userData) {
        const { firstName, id, isAdmin } = userData.data;
        console.log("User Connected: ", { firstName, id } );
        if (userData.data) {
          setUserLoggedIn(userData.data);
          setToken(true);
          setIsAdmin(isAdmin);
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
        isAdmin,
        setIsAdmin,
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
