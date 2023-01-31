const {
  addPetModel,
  editPetModel,
  getPetByIdModel,
  findPetsModel,
  setPetStatusFosteredModel,
  setPetStatusAdoptedModel,
  setPetStatusNotOwnedModel,
  getAllPetsModel,
} = require("../Models/petsModel");

function addPet(req, res) {
  try {
    const pet = addPetModel(req.body);
    if(pet){
    res.send(pet);
    return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function editPet(req, res) {
  try {
    const pet = await editPetModel(req.body);
    if (pet) res.send(req.body);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function getPetById(req, res) {
  try {
    const { petId } = req.params;
    // console.log("petId", petId);
    const pet = await getPetByIdModel(petId);
    // console.log("pet controller object, ", pet);
    if (pet) res.status(200).send(pet);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function findPets(req, res) {
  try {
    const search = req.query;
    const filteredPets = await findPetsModel(search);
    // console.log("filteredPets: ", filteredPets);
    if (filteredPets) res.status(200).send(filteredPets);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function setPetStatusFostered(req, res) {
  try {
    console.log("setPetStatusFostered Controller");
    const { petId } = req.body;
    const petStatus = await setPetStatusFosteredModel(petId);
    if (petStatus) res.status(200).send(petStatus);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function setPetStatusAdopted(req, res) {
  try {
    console.log("setPetStatusAdopted Controller");
    const { petId } = req.body;
    const petStatus = await setPetStatusAdoptedModel(petId);
    if (petStatus) res.status(200).send(petStatus);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function setPetStatusNotOwned(req, res) {
  try {
    console.log("setPetStatusNotOwned Controller");
    const { petId } = req.body;
    const petStatus = await setPetStatusNotOwnedModel(petId);
    console.log("petStatus", petStatus);
    if (petStatus) res.status(200).send(petStatus);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getAllPets(req, res) {
  try {
    const pets = await getAllPetsModel();
    // console.log("pets", pets);
    if (pets) res.status(200).send(pets);
  } catch (err) {
    res.status(400).send(err.message);
  }
}



module.exports = {
  addPet,
  editPet,
  getPetById,
  findPets,
  setPetStatusFostered,
  setPetStatusAdopted,
  setPetStatusNotOwned,
  getAllPets,
};
