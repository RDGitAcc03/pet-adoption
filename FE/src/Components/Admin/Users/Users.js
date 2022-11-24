import React from "react";
import User from "../User/User";
import "./Users.css";

const Users = ({ allUsers }) => {
  return (
    <ul>
      {allUsers.map((user) => {
        return (
          <ul key={user._id}>
            <User user={user} />
          </ul>
        );
      })}
    </ul>
  );
};

export default Users;
