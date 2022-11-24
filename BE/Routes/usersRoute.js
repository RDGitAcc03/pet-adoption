const express = require("express");
const router = express.Router();

const UsersController = require("../Controllers/usersController");
const {passwordsMatch, hashPwd, doesUserExist, isExistingUser, auth, verifyPwd} = require("../Middlewares/usersMiddleware");
const { validateBody } = require("../Middlewares/validateBody");


const { signUpSchema, loginSchema } = require("../Schemas/ValidationSchemas/allSchemas");
router.post("/signup", validateBody(signUpSchema), passwordsMatch, doesUserExist, hashPwd, UsersController.signup);
router.post("/login", validateBody(loginSchema), isExistingUser, verifyPwd, UsersController.login);
router.get('/logout', UsersController.logout);
router.get('/getAllSavedPets', auth, UsersController.getAllSavedPets);
router.get('/getAllOwnedPets', auth, UsersController.getAllOwnedPets);
router.get("/verifyLogin", auth, UsersController.verifyLogin);
router.get("/:userId", auth, UsersController.getUser);
router.get("/getAllUsers", auth, UsersController.getAllUsers);


router.put("/updateUser", auth, passwordsMatch, hashPwd, UsersController.updateUser);
router.put("/savepet", auth, UsersController.savePets);
router.put("/fosterpet", auth, UsersController.fosterPets);
router.put("/adoptpet", auth, UsersController.adoptPets);
router.put("/returnpet", auth, UsersController.returnPets);
router.delete("/:petId", auth, UsersController.unsavePets);


module.exports = router;
