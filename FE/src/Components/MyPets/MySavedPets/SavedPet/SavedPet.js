import React from "react";
import "./SavedPet.css";

const SavedPet = ({ saved }) => {
  const { name } = saved;
  return <div>{name}</div>;
};

export default SavedPet;
