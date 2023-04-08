import React, { useEffect } from "react";
import './Components/FontawesomeIcons';
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPet from "./Components/SearchPet/SearchPet";
import AddPet from "./Components/Admin/AddPet/AddPet";
import PetPage from "./Components/PetPage/PetPage";
import MyPets from "./Components/MyPets/MyPets";
import PetContextProvider from "./Contexts/petContext";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import ProtectedUser from "./Components/ProtectedRoutes/ProtectedUser/ProtectedUser";
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings";
import ProtectedAdmin from "./Components/ProtectedRoutes/ProtectedAdmin/ProtectedAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { useUserContext } from "./Contexts/userContext";


const App = () => {

  const { token, userLoggedIn } = useUserContext();

  const showToastMessage = () => {
    toast(`Hi ${userLoggedIn.firstName} ${userLoggedIn.lastName}!`, {
      position: toast.POSITION.TOP_LEFT,
      className: 'toast-message',
    });
  };

  useEffect(() => {
    token && showToastMessage();
    console.log("token from App: ", token)
  }, [token])

  return (
    <>
      <ToastContainer />
      <PetContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/dashboard"
              element={
                <ProtectedAdmin >
                  <Dashboard />
                </ProtectedAdmin>} />
            <Route path="/addPet"
              element={
                <ProtectedAdmin >
                  <AddPet />
                </ProtectedAdmin>} />
            <Route path="/editpet"
              element={
                <ProtectedAdmin >
                  <AddPet />
                </ProtectedAdmin>} />
            <Route exact path="/myPets"
              element={
                <ProtectedUser>
                  <MyPets />
                </ProtectedUser>} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/profile"
              element={
                <ProtectedUser>
                  <ProfileSettings />
                </ProtectedUser>} />
            <Route path="/searchPets" element={<SearchPet />} />
            <Route path="/pets" element={<PetPage />} />
          </Routes>
        </BrowserRouter>
      </PetContextProvider>
    </>
  );
};
  
export default App;
