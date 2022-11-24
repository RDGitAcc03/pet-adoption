import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import "./User.css";
import UserModal from "../../Modals/UserModal/UserModal";

const User = ({ user }) => {
  const { firstName, isAdmin, email } = user;
  const [showUserModal, setShowUserModal] = useState(false);

  const handleOnUserClick = () => {
    setShowUserModal(true);
  };

  return (
    <>
      <UserModal show={showUserModal} setShowUserModal={setShowUserModal} user={user}/>
      <li onClick={handleOnUserClick}>
        <span>
          {firstName}(
          {isAdmin ? (
            <FontAwesomeIcon icon={faUserTie} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
          )
        </span>
        <span>{email}</span>
      </li>
    </>
  );
};

export default User;
