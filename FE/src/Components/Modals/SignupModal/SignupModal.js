import React, { useState } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import "./SignupModal.css";
import instance from "../../../Contexts/axiosContext";

const SignupModal = ({
  showSignupModal,
  setShowSignupModal,
  setShowLoginModal,
}) => {
  const [userSignedUp, setUserSignedUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
    phoneNumber: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = await instance.post(`users/signup`, userSignedUp);
    if (userData.data) {
      alert("You've signed up successfully !");
      console.log("userData.data", userData.data);
      handleLoginFromSignup(e);
    }
  };

  const handleLoginFromSignup = (e) => {
    e.preventDefault();
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
      <Container>
        <Form className="p-4">
          <div>
            <h1 className="h1-header">Sign Up</h1>

            <Form.Group className="input-pairs">
              <Form.Control
                autoFocus
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={(e) =>
                  setUserSignedUp({
                    ...userSignedUp,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={(e) =>
                  setUserSignedUp({
                    ...userSignedUp,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="input-pairs">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) =>
                  setUserSignedUp({
                    ...userSignedUp,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={(e) =>
                  setUserSignedUp({
                    ...userSignedUp,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="input-pairs">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setUserSignedUp({
                    ...userSignedUp,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="repassword"
                onChange={(e) =>
                  setUserSignedUp({
                    ...userSignedUp,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>

            <div className="btn-container">
              <Button
                className="signup-btn"
                type="submit"
                onClick={(e) => handleSignup(e)}
              >
                Sign Up
              </Button>
            </div>
            <div className="login-from-signup">
              <Form.Text>
                <span>
                  Already Have An Account?
                </span>              
                <span
                  onClick={(e) => {
                    handleLoginFromSignup(e);
                  }}
                >
                  Login now!
                </span>
              </Form.Text>
            </div>
          </div>
        </Form>
      </Container>
    </Modal>
  );
};

export default SignupModal;
