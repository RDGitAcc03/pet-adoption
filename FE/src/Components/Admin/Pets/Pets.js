import React from "react";
import "../Dashboard/PetOfPets/PetOfPets.css";
import PetOfPets from '../Dashboard/PetOfPets/PetOfPets';

const Pets = ({ allPets }) => {
  // console.log("allPets", allPets);
  return (
    <ul className="ul-pets">
      {allPets.map((pet) => {
        return <ul key={pet._id}>
          <PetOfPets pet={pet}/>
        </ul>;
      })}
    </ul>
  );
};

export default Pets;
