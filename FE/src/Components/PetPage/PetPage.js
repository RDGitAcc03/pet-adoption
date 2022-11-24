import React, { useEffect } from "react";
import "./PetPage.css";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useUserContext } from "../../Contexts/userContext";
import { usePetContext } from "../../Contexts/petContext";
import instance from "../../Contexts/axiosContext";

const PetPage = () => {

  const {userLoggedIn} = useUserContext();

  const navigate = useNavigate();
  const {
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
  } = usePetContext();
  const { token } = useUserContext();

  const fetchPetForPetPage = async (petId) => {
    const res = await instance.get(`/pets/${petId}`);
    if (res) setPet(res.data);
  };

  const handleButtonCompatibleForPet = async (id) => {
    const userId = userLoggedIn.id;
    const user = await instance.get(`/users/${userId}`);
    const { savedPets, fosteredPets, adoptedPets } = user.data;
    const savedPet = savedPets.find((petId) => petId === id);
    const fosteredPet = fosteredPets.find((petId) => petId === id);
    const adoptedPet = adoptedPets.find((petId) => petId === id);
    if (savedPet) setIsSaved(true);
    if (fosteredPet) setIsFostered(true);
    if (adoptedPet) setIsAdopted(true);
    console.log("at the end");
  };

  useEffect(() => {
    const id = getPetId();
    fetchPetForPetPage(id);
    handleButtonCompatibleForPet(id);
  }, []);

  const handleSavePet = async () => {
    try {
      console.log("handleSavePet Func Active");
      setIsSaved(true);
      const id = getPetId();
      const res = await instance.put(`/users/savepet`, { id });
      if (res.data) console.log("saved", res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUnSavePet = async () => {
    try {
      console.log("handleUnSavePet Func Active");
      setIsSaved(false);
      const petId = getPetId();
      const res = await instance.delete(`/users/${petId}`);
      if (res.data.ok) console.log("unsaved", res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFosterPet = async () => {
    try {
      console.log("handleFosterPet Func Active");
      setIsFostered(true);
      setIsAdopted(false);
      setIsReturned(false);
      const petId = getPetId();
      const res = await instance.put(`/users/fosterpet`, { petId });
      if (res.data.ok) console.log("fostered", res.data);
      const changeStatusAdotption = await instance.put(
        "/pets/setPetStatusFostered",
        { petId }
      );
      if (changeStatusAdotption.data) console.log("fostered");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAdoptPet = async () => {
    try {
      console.log("handleAdoptPet Func Active");
      setIsAdopted(true);
      setIsFostered(false);
      setIsReturned(false);
      const petId = getPetId();
      const res = await instance.put(`/users/adoptpet`, { petId });
      if (res.data.ok) console.log("adopted", res.data);
      const changeStatusAdotption = await instance.put(
        `/pets/setPetStatusAdopted`,
        { petId }
      );
      if (changeStatusAdotption.data) console.log("adopted");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleReturnPet = async () => {
    try {
      console.log("handleReturnPet Func Active");
      setIsReturned(true);
      setIsAdopted(false);
      setIsFostered(false);
      const petId = getPetId();
      const res = await instance.put(`/users/returnpet`, { petId });
      if (res.data) console.log("returned");
      const changeStatusAdotption = await instance.put(
        `/pets/setPetStatusNotOwned`,
        { petId }
      );
      if (changeStatusAdotption.data) console.log("not owned");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleGoBackToSearch = async () => {
    try {
      navigate(-1);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getPetId = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("petId");
    return id;
  };

  return (
    <>
      <Card className="pet-page-card">
        <Card.Img
          variant="top"
          src={pet.imageUrl}
          style={{ height: "200px" }}
        />
        <Card.Body className="pet-page-card-body">
          <Card.Title>{pet.name}</Card.Title>
          <p>Type: {pet.type}</p>
          <p>Adoption Status: {pet.adoptionStatus}</p>
          <p>Color: {pet.color}</p>
          {/* <p>Hypoallergenic: {pet.hypoallergenic}</p>
          <p>Dietary Restrictions: {pet.dietaryRestrictions}</p>
          <p>Breed Of Animal: {pet.breedOfAnimal}</p>
          <p>Height: {pet.height}</p>
          <p>Weight: {pet.weight}</p>
          <p>Bio: {pet.bio}</p> */}
        </Card.Body>
      </Card>
      <div className="buttons">
        <Button
          className="btn"
          variant="success"
          type="submit"
          onClick={handleGoBackToSearch}
        >
          Back
        </Button>
        <Button
          className="btn"
          variant="primary"
          onClick={isSaved ? handleUnSavePet : handleSavePet}
        >
          {isSaved ? "UnSave" : "Save"}
        </Button>
        {token && (
          <>
            {!isFostered && !isAdopted && (
              <>
                <Button
                  className="btn"
                  variant="dark"
                  type="submit"
                  onClick={handleFosterPet}
                >
                  Foster
                </Button>
                <Button
                  className="btn"
                  variant="dark"
                  type="submit"
                  onClick={handleAdoptPet}
                >
                  Adopt
                </Button>
              </>
            )}
            {isFostered && !isAdopted && (
              <Button
                className="btn"
                variant="dark"
                type="submit"
                onClick={handleAdoptPet}
              >
                Adopt
              </Button>
            )}
            {(isFostered || isAdopted) && !isReturned && (
              <Button
                className="btn"
                variant="danger"
                type="submit"
                onClick={handleReturnPet}
              >
                Return Pet
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PetPage;
