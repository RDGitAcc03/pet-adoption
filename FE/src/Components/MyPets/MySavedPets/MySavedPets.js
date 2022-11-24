import React from "react";
import Pet from "../../Pet/Pet";

const MySavedPets = ({ savedPets }) => {
  return (
    <>
      {savedPets.map((saved, index) => {
        return (
          <div key={index}>
            <Pet pet={saved} />
          </div>
        );
      })}
    </>
  );
};

export default MySavedPets;
