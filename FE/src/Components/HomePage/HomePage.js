import React from "react";
import "./HomePage.css";
import { Box, Image } from "@chakra-ui/react";

// import { Container } from "react-bootstrap";
// import { useUserContext } from "../../Contexts/userContext";
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // const { token, userLoggedIn } = useUserContext();
  // const { isAdmin } = userLoggedIn;
  // const navigate = useNavigate();

  // token && isAdmin && navigate("/addPet");

  return (
    <>
      <Box id="welcoming" borderColor={"#fff"}>
        <Box id="arrow">
          <Image
            src={
              "http://demo2.themelexus.com/petzen/wp-content/uploads/2020/05/revolution-icon-5.svg"
            }
          />
        </Box>
        <Box id="star">
          <Image
            src={
              "	http://demo2.themelexus.com/petzen/wp-content/uploads/2020/05/revolution-icon-4.svg"
            }
          />
        </Box>
        <Box id="bone">
          <Image
            src={
              "	http://demo2.themelexus.com/petzen/wp-content/uploads/2020/05/revolution-icon-6.svg"
            }
          />
        </Box>
        <Box id="top" borderColor={"#fff"}>
          Only The Best
        </Box>
        <Box id="middle" borderColor={"#fff"}>
          <span id="content1">For Your</span>
          <span id="content2">Best Friend</span>
        </Box>
      </Box>
    </>
    // <div className="welcome-div">
    //   <Container>
    //     {token ? (
    //       <>
    //         <h1>Hi {userLoggedIn?.firstName}!</h1>
    //         <h2>We Wish You A Wonderful Journey Finding Your Own Pet</h2>
    //       </>
    //     ) : (
    //       <h1>Welcome Dear Guest! We Are Happy To See You Here</h1>
    //     )}
    //     <p>In this site, you can search for pets, foster or even adopt them.</p>
    //     <p>To look for your right match, please click 'Search Pet'.</p>
    //     <p>We Are Very Excited For You!</p>
    //   </Container>
    // </div>
  );
};

export default HomePage;
