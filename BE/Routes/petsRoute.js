const express = require("express");
const {
  upload,
  uploadToCloudinary,
} = require("../Middlewares/imageMiddleware");
const router = express.Router();
const { doesPetExist } = require("../Middlewares/doesPetExist");
const { auth, authAdmin } = require("../Middlewares/usersMiddleware");
const { filterPets } = require("../Middlewares/filterPets");
const petController = require("../Controllers/petsController");

// ,doesPetExist
router.post("/addPet",upload.single("picture"),uploadToCloudinary,petController.addPet);
router.put("/editpet", upload.single("picture"),uploadToCloudinary, petController.editPet); 
router.put("/setPetStatusFostered", auth, petController.setPetStatusFostered);
router.put("/setPetStatusAdopted", auth, petController.setPetStatusAdopted);
router.put("/setPetStatusNotOwned", auth, petController.setPetStatusNotOwned);
router.get("/searchPets", filterPets, petController.findPets);
router.get("/getAllPets", auth, petController.getAllPets);
router.get("/:petId", auth, petController.getPetById);

module.exports = router;
