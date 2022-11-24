import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone, faCat } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Modal } from "react-bootstrap";
import "./UserModal.css";
import instance from "../../../Contexts/axiosContext";

const UserModal = ({ show, setShowUserModal, user }) => {
  const { firstName, lastName, email, phoneNumber, password, bio, _id:id} = user;
  const [userOwnedPets, setUserOwnedPets] = useState([]);

  const getUserPets = async () => {
    const userOwnedPets = await instance.get("/users/getAllOwnedPets");
    // console.log("userOwnedPets.data", userOwnedPets.data);
    const { fostered, adopted } = userOwnedPets.data;
    let ownedPets = [];
    fostered.forEach((pet) => ownedPets.push(pet));
    adopted.forEach((pet) => ownedPets.push(pet));
    ownedPets = await Promise.all(
      ownedPets.map(async (petId) => {
        const pet = await instance.get(`pets/${petId}`);
        return pet.data;
      })
    );
    setUserOwnedPets(ownedPets);
  };

  useEffect(() => {
    getUserPets();
  }, []);

  // console.log("userOwnedPets", userOwnedPets);

  return (
    <Modal
      show={show}
      onHide={() => setShowUserModal(false)}
      className="modal-lg"
    >
      <Container className="modal-container">
        <div className="modal-main">
          <div className="modal-body">
            <div className="modal-title">
              <p>
                <span className="title-l">Full Name:</span>
                <span className="title-r">
                  {firstName} {lastName}
                </span>
              </p>
            </div>
            <div>
              <p>
                <span className="l">Email:</span>
                <span className="r">{email}</span>
              </p>
              <p>
                <span className="l">Phone Number:</span>
                <span className="r">{phoneNumber}</span>
              </p>
              <p>
                <span className="l">Password:</span>
                <span className="r">{password}</span>
              </p>
              <p>
                <span className="l">Bio:</span> <span className="r">{bio}</span>
              </p>
            </div>
          </div>
          <div className="modal-user-pets">
            <div id="pets-header">list of pets</div>

            <div className="pets-container">
              {userOwnedPets &&
                userOwnedPets.map((pet) => {
                  return (
                    <p key={pet._id}>
                      <span className="l">{pet.name}</span>
                      <span className="r">
                        <FontAwesomeIcon icon={pet.type === "Dog" ? faBone : faCat} />
                      </span>
                    </p>
                  )
                })}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button>Cancel</Button>
        </div>
      </Container>
    </Modal>
  );
};

export default UserModal;
