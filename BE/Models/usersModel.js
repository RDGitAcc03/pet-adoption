// const { findById } = require("../Schemas/MongoSchemas/userSchema");
const User = require("../Schemas/MongoSchemas/userSchema");

async function signUpModel(newUser) {
  try {
    console.log("newUser", newUser);
    const user = new User(newUser);
    console.log("My new signedup user: ", user);
    await user.save();
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUserByEmailModel(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

async function savePetModel(petId, userId) {
  try {
    // console.log("petId", petId, "userId", userId);
    const newDoc = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { savedPets: petId } },
      // { new: true }
    );
    return newDoc;
  } catch (err) {
    console.log(err.message);
  }
}

async function fosterPetModel(petId, userId) {
  try {
    // console.log("petId", petId, "userId", userId);
    const fostered = await User.updateOne(
      { _id: userId },
      { $push: { fosteredPets: petId } }
    );
    await unsavePetModel(petId, userId);
    await User.updateOne({ _id: userId }, { $pull: { adoptedPets: petId } });
    return fostered;
  } catch (err) {
    console.log(err.message);
  }
}

async function adoptPetModel(petId, userId) {
  try {
    // console.log("petId", petId, "userId", userId);
    const adopted = await User.updateOne(
      { _id: userId },
      { $push: { adoptedPets: petId } }
    );
    // console.log("adopted from model", adopted);
    await unsavePetModel(petId, userId);
    await User.updateOne({ _id: userId }, { $pull: { fosteredPets: petId } });
    return adopted;
  } catch (err) {
    console.log(err.message);
  }
}

async function returnPetModel(petId, userId) {
  try {
    // console.log("petId", petId, "userId", userId);
    const returned = await User.updateOne(
      { _id: userId },
      { $pull: { adoptedPets: petId } }
    );
    console.log("returned from returnPet model", returned);
    await User.updateOne({ _id: userId }, { $pull: { fosteredPets: petId } });
    return returned;
  } catch (err) {
    console.log(err.message);
  }
}

async function unsavePetModel(petId, userId) {
  try {
    console.log("petId", petId, "userId", userId);
    const deleted = await User.updateOne(
      { _id: userId },
      { $pull: { savedPets: petId } }
    );
    if (deleted) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}


async function updateUserModal(userId, updatedUser) {
  try {
    const user = await User.findById(userId);
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.phoneNumber = updatedUser.phoneNumber;
    user.password = updatedUser.password;
    user.bio = updatedUser.bio;
   const newUser = await user.save()
    if (newUser) return newUser;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUserByIdModel(userId) {
  try {
    const user = await User.findById(userId);
    if (user) return user;
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllUsersModel() {
  try {
    const users = await User.find({});
    if (users) return users;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  signUpModel,
  getUserByEmailModel,
  savePetModel,
  fosterPetModel,
  adoptPetModel,
  returnPetModel,
  unsavePetModel, 
  updateUserModal,
  getUserByIdModel, 
  getAllUsersModel
};
