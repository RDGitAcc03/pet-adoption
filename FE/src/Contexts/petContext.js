import React, { createContext, useContext, useState } from "react";

const petContext = createContext({});

export const usePetContext = () => {
  return useContext(petContext);
};

const PetContextProvider = ({ children }) => {
  const [pet, setPet] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isFostered, setIsFostered] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);
  const [isReturned, setIsReturned] = useState(false);
  const [savedPets, setSavedPets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [allPets, setAllPets] = useState([]);
  return (
    <petContext.Provider
      value={{
        pet,
        setPet,
        isSaved,
        setIsSaved,
        isFostered,
        setIsFostered,
        isAdopted,
        setIsAdopted,
        isReturned,
        setIsReturned,
        savedPets, 
        setSavedPets,
        ownedPets, 
        setOwnedPets,
        allPets,
        setAllPets
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
