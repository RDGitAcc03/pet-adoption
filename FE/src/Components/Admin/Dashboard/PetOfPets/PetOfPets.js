import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone, faCat } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./PetOfPets.css";
import { useNavigate } from "react-router-dom";

const PetOfPets = ({ pet }) => {
  const { name, adoptionStatus, type } = pet;
  const navigate = useNavigate();

  const handleOnPetClick = () => {
    navigate(`/editpet?edit=${pet._id}`);
  };

  return (
    <>
     
      <li onClick={handleOnPetClick}>
        <span>
          {name}({adoptionStatus})
        </span>
        <span>
          {type === "Dog" ? (
            <FontAwesomeIcon icon={faBone} />
          ) : (
            <FontAwesomeIcon icon={faCat} />
          )}
        </span>
      </li>
    </>
  );
};

export default PetOfPets;
