const Pet = require("../Schemas/MongoSchemas/petSchema");
async function addPetModel(newUser) {
  try {
    delete newUser.petId;
    const pet = new Pet(newUser);
    await pet.save();
    return pet;
  } catch (err) {
    console.log(err.message);
  }
}

async function editPetModel(newPet) {
  try {
    const {petId} = newPet;
    const pet = await Pet.findByIdAndUpdate(petId, newPet, {new: true});
    console.log("new Pet Created:", pet);
    return pet;
  } catch (err) {
    console.log(err.message);
  }
}

async function getPetByIdModel(petId) {
  try {
    // console.log("Coming From Model Pet Id Of Pet Route, ", petId);
    const pet = await Pet.findById({ _id: petId });
    // console.log("model pet object, ",pet);
    return pet;
  } catch (err) {
    console.log(err.message);
  }
}

async function findPetsModel(params) {
  try {
    const filteredPets = await Pet.find(params);
    return filteredPets;
  } catch (err) {
    console.log(err.message);
  }
}

async function setPetStatusFosteredModel(petId) {
  try {
    console.log("petId", petId);
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Fostered" } }
    );
    console.log("petStatus inside model, ", petStatus);
    if (petStatus) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function setPetStatusAdoptedModel(petId) {
  try {
    console.log("petId", petId);
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Adopted" } }
    );
    console.log("petStatus inside model, ", petStatus);
    if (petStatus) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function setPetStatusNotOwnedModel(petId) {
  try {
    console.log("petId", petId);
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Not Owned" } }
    );
    console.log("petStatus inside model, ", petStatus);
    if (petStatus) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllPetsModel() {
  try {
    const pets = await Pet.find({});
    if (pets) return pets;
  } catch (err) {
    console.log(err.message);
  }
}


module.exports = {
  addPetModel,
  editPetModel,
  getPetByIdModel,
  findPetsModel,
  setPetStatusFosteredModel,
  setPetStatusAdoptedModel,
  setPetStatusNotOwnedModel,
  getAllPetsModel,
};
