  import React, { useEffect, useState } from "react";
import "./ProfileSettings.css";
import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../../Contexts/userContext";
import instance from "../../Contexts/axiosContext";

function ProfileSettings() {
  const { userLoggedIn, setUserLoggedIn } = useUserContext();
  const defaultUser = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    repassword: "",
    bio: ""
  };
  const [updatedUser, setUpdatedUser] = useState(defaultUser);
  // console.log("updatedUser", updatedUser);
  const handleUpdateUserProfile = async (e) => {
    try {
      e.preventDefault();
      console.log("updatedUser", updatedUser);
      const user = await instance.put(`http://localhost:8080/users/updateUser`,  updatedUser);
      if (user) console.log("updated user", user.data);
      setUserLoggedIn(user.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUpdatedUser(defaultUser);
  }
  
  const getCurrentPerson = async() => {
    const userId = userLoggedIn.id;
    const {id} = userLoggedIn;
    console.log("userId", id);
    const person = await instance.get(`/users/${userId}`);
    if(person) setUpdatedUser(person.data);
  }

  useEffect(()=> {
    getCurrentPerson();
  }, [])

  return (
    <>
      <h1>Profile Settings</h1>
      <Form className="form-profile">
        <div>
          <Form.Group className="form-child-profile">
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              value={updatedUser?.firstName || ""}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={updatedUser?.lastName || ""}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="form-child-profile">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={updatedUser?.email || ""}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={updatedUser?.phoneNumber || ""}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="form-child-profile">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="repassword"
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="form-child-profile">
            <textarea
              className="profile-textarea"
              placeholder="Bio"
              name="bio"
              value={updatedUser?.bio || ""}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </div>
        <div className="profile-buttons">
          <Button onClick= {(e)=> handleClear(e)}>Clear</Button>
          <Button onClick={(e) => handleCancel(e)}>Cancel</Button>
          <Button onClick={(e) => handleUpdateUserProfile(e)}>Save</Button>
        </div>
      </Form>
    </>
  );
}

export default ProfileSettings;
