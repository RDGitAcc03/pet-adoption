import React, { useEffect, useState } from "react";
import styles from "./ProfileSettings.module.css";
import { Button, Stack } from "@chakra-ui/react";
import { useUserContext } from "../../Contexts/userContext";
import instance from "../../Contexts/axiosContext";
import { AiOutlineClear } from "react-icons/ai";

function ProfileSettings() {
  const { userLoggedIn, setUserLoggedIn, token } = useUserContext();
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
      const user = await instance.put(`/users/updateUser`, updatedUser);
      if (user) console.log("updated user", user.data);
      setUserLoggedIn(user.data);
      console.log("user was updated");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    getCurrentPerson();
  };

  const clearForm = () => {
    // console.log("clear form");
    const form = document.querySelector('form');
    setUpdatedUser(defaultUser);
    form.reset();
    console.log("defaultUser after clearing: ", defaultUser);
  }

  const getCurrentPerson = async () => {
    const userId = userLoggedIn.id;
    // const { _id } =  userLoggedIn;
    // console.log("userId", userId);
    const person = await instance.get(`/users/${userId}`);
    if (person) {
      console.log("person: ", person.data.firstName);
      setUpdatedUser(person.data);
    }
  }

  useEffect(() => {
    getCurrentPerson();
    console.log("profile settings page lunched");
    console.log("token from ProfileSettings: ", token);
  }, [token])

  return (
    <div>
      <form className={styles["form-profile"]}>
        <AiOutlineClear onClick={() => clearForm()} style={{ cursor: "pointer", position: "absolute", top: "4%", right: "5%", fontSize: "1.4rem" }} />
        <h1>Profile Settings</h1>
        <Stack isInline>
          <input className={styles["form-child-profile"]}
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
          <input className={styles["form-child-profile"]}
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
        </Stack>
        <Stack isInline>
          <input className={styles["form-child-profile"]}
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
          <input className={styles["form-child-profile"]}
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
        </Stack>
        <Stack isInline>
          <input className={styles["form-child-profile"]}
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
          <input className={styles["form-child-profile"]}
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
        </Stack>
        <Stack isInline>
          <textarea
            className={styles["profile-textarea"]}
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
        </Stack>
        <Stack isInline className={styles["profile-buttons"]}>
          {/* <Button bgColor={'#FF4880'} color={'white'} onClick= {(e)=> handleClear(e)}>Clear</Button> */}
          <Button bgColor={'#FF4880'} color={'white'} onClick={(e) => handleCancel(e)}>Cancel</Button>
          <Button bgColor={'#FF4880'} color={'white'} onClick={(e) => handleUpdateUserProfile(e)}>Save</Button>
        </Stack>
      </form>
    </div>
  );
}

export default ProfileSettings;
