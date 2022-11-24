import React, { useEffect } from "react";
import "./Dashboard.css";
import Users from "../Users/Users";
import { usePetContext } from "../../../Contexts/petContext";
import Pets from "../Pets/Pets";
import instance from "../../../Contexts/axiosContext";
import { useUserContext } from "../../../Contexts/userContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { allUsers, setAllUsers } = useUserContext();
  const { allPets, setAllPets } = usePetContext();
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await instance.get("/users/getAllUsers");
      // if (res.data) console.log("all users", res.data);
      setAllUsers(res.data);
    } catch(e) {
      console.log(e);
      setAllUsers([]);
    }
  };
  const getAllPets = async () => {
    try {
      const res = await instance.get("/pets/getAllPets");
      // if (res.data) console.log("all pets", res.data);
      setAllPets(res.data);
    } catch (e) {
      console.log(e);
      setAllPets([]);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllPets();
  }, []);

  return (
    <div className="dashboard-container">
      <p className="add-pet-link" onClick={() => navigate(`/addPet`)}>Add Pet</p>
      <div className="left-list">
        <Users allUsers={allUsers} />
      </div>
      <div className="right-list">
        <Pets allPets={allPets} />
      </div>
    </div>
  );
};

export default Dashboard;
