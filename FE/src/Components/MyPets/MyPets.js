import "./MyPets.css";
import React, { useEffect, useState } from "react";
import { usePetContext } from "../../Contexts/petContext";
import instance from "../../Contexts/axiosContext";
import MyOwnedPets from "./MyOwnedPets/MyOwnedPets";
import MySavedPets from "./MySavedPets/MySavedPets";

export const MyPets = () => {
  const { savedPets, setSavedPets, ownedPets, setOwnedPets } = usePetContext();
  const [toggle, setToggle] = useState(false);

  const getAllSavedPets = async () => {
    const res = await instance.get("/users/getAllSavedPets");
    let savedArr = [];
    for (let petId of res.data) {
      const pet = await instance.get(`/pets/${petId}`);
      console.log("pet saved inside for loop", pet.data);
      savedArr.push(pet.data);
    }
    setSavedPets(savedArr);
  };

  const getAllOwnedPets = async () => {
    const res = await instance.get(`/users/getAllOwnedPets`);
    const { fostered, adopted } = res.data;
    console.log("fostered", fostered);

    let ownedArr = [];
    for (let petId of fostered) {
      const pet = await instance.get(`/pets/${petId}`);
      console.log("pet inside for loop", pet.data);
      ownedArr.push(pet.data);
    }
    for (let petId of adopted) {
      const pet = await instance.get(`/pets/${petId}`);
      ownedArr.push(pet.data);
    }
    setOwnedPets(ownedArr);
  };

  useEffect(() => {
    try {
      getAllSavedPets();
      getAllOwnedPets();
      console.log("savedPets", savedPets);
      console.log("ownedPets", ownedPets);
    } catch (err) {
      console.log(err.messasge);
    }
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <h1>My Pets</h1>
      <span className="txt">Saved</span>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" onClick={handleToggle}></span>
      </label>
      <div className="my-pets-list">
        {toggle ? (
          <MySavedPets savedPets={savedPets} />
        ) : (
          <MyOwnedPets ownedPets={ownedPets} />
        )}
      </div>
    </div>
  );
};

export default MyPets;
