const Pet = require("../Schemas/MongoSchemas/petSchema");

async function doesPetExist(req, res, next) {
  try {
    // console.log("req.body", req.body);
    const { petId } = req.body;
    const pet = Pet.findById(petId);
    if (pet) console.log("pet", pet);
    res.status(400).send("Pet Already Exists!");
    return pet;
  } catch (err) {
    console.log(err);
  }
  next();
}

module.exports = { doesPetExist };
