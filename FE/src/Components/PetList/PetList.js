import React from "react";
import Pet from "../Pet/Pet";
import "../PetList/PetList.css";

const Pets = ({ arrPets }) => {
  // console.log("arrPets", arrPets);
  return (
    <>
      {arrPets.map((pet) => {
        return (
          <div key={pet._id}>
            <Pet pet={pet} />
          </div>
        );
      })}
    </>
  );
};

export default Pets;
