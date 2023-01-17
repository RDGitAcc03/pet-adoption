import React from "react";
import './Components/FontawesomeIcons';
import "./App.css";
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
import UserContextProvider from "./Contexts/userContext";


const App = () => {
  return (
    <UserContextProvider>
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
                <ProtectedUser >
                  <MyPets />
                </ProtectedUser>} />
            <Route path="/profile"
              element={
                <ProtectedUser>
                  <ProfileSettings />
                </ProtectedUser>} />
            <Route path="/searchPets" element={<SearchPet />} />
            <Route path="/pets" element={<PetPage />} />
            <Route exact path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </PetContextProvider>
    </UserContextProvider>
  );
};

export default App;
