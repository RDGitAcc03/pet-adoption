const express = require("express");
const router = express.Router();

const appOperationsController = require("../Controllers/appOperationsController");

router.get("/getWeeklyPet", appOperationsController.getWeeklyPet);

module.exports = router;
