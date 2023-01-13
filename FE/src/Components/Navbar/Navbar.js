import "./Navbar.css";
import React, { useState } from "react";
import { BsGearFill, BsHouseDoor } from "react-icons/bs";
import LoginModal from "../Modals/LoginModal/LoginModal";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../Contexts/userContext";
import instance from "../../Contexts/axiosContext";
import { Image } from "@chakra-ui/react";
import petLogo from "../../images/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { token, setToken, setUserLoggedIn } = useUserContext();

  const handleLogout = async () => {
    try {
      const res = await instance.get("/users/logout");
      console.log("res.data", res.data);
      if (res.data.ok) {
        setToken(false);
        setUserLoggedIn({});
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // const handleMyPetsClicked = () => {

  // }

  return (
    <>
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <nav className="nav-links-container">
        <div className="nav-links-left">
          <Image src={petLogo} w={"90px"} />
          {/* <img src="../../images/adoptme.jpg" /> */}
          <Link className="navLink" to="/" onClick={() => navigate("/")} >
            <BsHouseDoor id="homeLogo" style={{fontWeight: 'bold', fontSize: '20px'}}/>
          </Link>

          {!token ? (
            <Link
              className="navLink"
              to="/"
              variant="light"
              border={'1px solid'}
              onClick={() => setShowLoginModal(true)}
            >
              Login/Signup
            </Link>
          ) : (
            <>
              <Link className="navLink" to="/" onClick={handleLogout}>
                Logout
              </Link>
              <Link className="navLink" to="/profile">
                <BsGearFill />
              </Link>
              <Link className="navLink" to="/myPets">
                My Pets
              </Link>
            </>
          )}
        </div>
        <div className="nav-links-right">
          <Link className="navLink" to="/searchPets" variant="light">
            Search Pet
            <i className="lexus-icon-search" aria-hidden="true"></i>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
