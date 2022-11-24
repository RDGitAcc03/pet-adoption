import React, { useState } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import "./LoginModal.css";
import SignupModal from "../SignupModal/SignupModal";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../Contexts/userContext";
import instance from "../../../Contexts/axiosContext";

const LoginModal = ({ showLoginModal, setShowLoginModal }) => {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);

  const { userLoggedIn, setUserLoggedIn, setToken } = useUserContext();

  const handleSignupFromLogin = (e) => {
    e.preventDefault();
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("userLoggedIn", userLoggedIn);
      const userData = await instance.post("/users/login", userLoggedIn);
      console.log("userData.data", userData.data);
      if (userData) {
        setShowLoginModal(false);
        setUserLoggedIn(userData.data);
        setToken(true);
        const {isAdmin} = userData.data;
        if (isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <SignupModal
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
        setShowLoginModal={setShowLoginModal}
      />
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Container>
          <Form className="p-4 sign-up-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h1 className="text-center p-2">Login</h1>
              <Form.Control
                autoFocus
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setUserLoggedIn({ ...userLoggedIn, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setUserLoggedIn({ ...userLoggedIn, password: e.target.value })
                }
              />
            </Form.Group>
            <div className="btn-container">
              <Button
                className="login-btn"
                variant="primary"
                type="submit"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </Button>
            </div>
            <div className="signup-from-login mt-4">
              <Form.Text>
                Need A New Account?
                <span onClick={(e) => handleSignupFromLogin(e)}>
                  Sign up now!
                </span>
              </Form.Text>
            </div>
          </Form>
        </Container>
      </Modal>
    </>
  );
};

export default LoginModal;
