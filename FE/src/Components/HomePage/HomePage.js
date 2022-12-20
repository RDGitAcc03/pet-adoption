import React from "react";
import "./HomePage.css";
import { Box, Button, Heading, Image } from "@chakra-ui/react";
import SVG from "../../images/hills.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { Container } from "react-bootstrap";
// import { useUserContext } from "../../Contexts/userContext";
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // const { token, userLoggedIn } = useUserContext();
  // const { isAdmin } = userLoggedIn;
  // const navigate = useNavigate();

  // token && isAdmin && navigate("/addPet");
  let script = document.createElement("script");
  script.setAttribute('src', '../js/animatingRandom.js');
  script.setAttribute('type', 'text/javascript');

  return (
    <>
      {/* <VStack> */}
      <section className="sec-1">
        <Box id="welcoming" borderColor={"#fff"}>
          <Box id="arrow">
            <Image
              src={"http://demo2.themelexus.com/petzen/wp-content/uploads/2020/05/revolution-icon-5.svg"} />
          </Box>
          <Box id="star">
            <Image
              src={"http://demo2.themelexus.com/petzen/wp-content/uploads/2020/05/revolution-icon-4.svg"} />
          </Box>
          <Box id="bone">
            <Image
              src={"http://demo2.themelexus.com/petzen/wp-content/uploads/2020/05/revolution-icon-6.svg"} />
          </Box>
          <Box id='fingerprints'>
            <Image src={"http://demo2.themelexus.com/petzen/wp-content/uploads/2020/05/revolution-icon-1.svg"} />
          </Box>
          <Box>
            <Button id="learnMoreBtn">
              learn more
            </Button>
          </Box>
          <Box id="top" borderColor={"#fff"}>
            <span style={{ '--i': 1 }}>O</span>
            <span style={{ '--i': 2 }}>n</span>
            <span style={{ '--i': 3 }}>l</span>
            <span style={{ '--i': 4 }}>y&nbsp;</span>
            <span style={{ '--i': 5 }}>T</span>
            <span style={{ '--i': 6 }}>h</span>
            <span style={{ '--i': 7 }}>e&nbsp;</span>
            <span style={{ '--i': 8 }}>B</span>
            <span style={{ '--i': 9 }}>e</span>
            <span style={{ '--i': 10 }}>s</span>
            <span style={{ '--i': 11 }}>t</span>

            {/* <Box className="word">
              <Box>O</Box><Box>n</Box><Box>l</Box><Box>y</Box>
            </Box>
            <Box className="word">
              <Box>T</Box><Box>h</Box><Box>e</Box>
            </Box>
            <Box className="word">
              <Box>B</Box><Box>e</Box><Box>s</Box><Box>t</Box>
            </Box> */}
          </Box>
          <Heading as={'h1'} id="middle" borderColor={"#fff"}>
            <span className="content1">For Your</span>
            <span className="content2">Best Friend</span>
          </Heading>

        </Box>
        <Box className="hills">
          <Image src={SVG} />
        </Box>
      </section>
      <section className="sec-2">
        <Heading as={'h2'}>
          <span className="content1">Welcome To</span>
          <span className="content2">Pet Care Center</span>
        </Heading>
        <Box id="mid">
          <Box id="mid-left">
            <Image src={"http://demo2.themelexus.com/petzen/wp-content/uploads/2020/03/home-1-01.jpg"} />
          </Box>
          <Box id="mid-right">
            <Box id="one"><p>Grooming & Supply provides grooming services for all dog and cat breeds. We are fully committed to the health and hygiene of your furry best friends. We offer free estimates and consultations to help your pet look and feel their best!</p></Box>
            <Box id="two">
              <ul>
                <li><FontAwesomeIcon className="icon" icon="check-circle" /><span>CERTIFIED GROOMER</span></li>
                <li><FontAwesomeIcon className="icon" icon="check-circle" /><span>20 YEARS OF EXPERIENCE</span></li>
                <li><FontAwesomeIcon className="icon" icon="check-circle" /><span>ANIMAL LOVER</span></li>
                <li><FontAwesomeIcon className="icon" icon="check-circle" /><span>PET PARENT OF 3 DOGS</span></li>
              </ul>
            </Box>
            <Box id="three">
              <Button>LEARN MORE</Button>
            </Box>
          </Box>
        </Box>
      </section>
      {/* </VStack> */}
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


