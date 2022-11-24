import React from "react";
import Pet from "../../Pet/Pet";

const MyOwnedPets = ({ ownedPets }) => {
  console.log("ownedPets");
  return (
    <>
      {ownedPets &&
        ownedPets.map((owned, index) => {
          return (
            <div key={index}>
              <Pet pet={owned} />
            </div>
          );
        })}
    </>
  );
};

export default MyOwnedPets;
