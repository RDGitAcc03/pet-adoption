const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  signUpModel,
  savePetModel,
  unsavePetModel,
  fosterPetModel,
  adoptPetModel,
  returnPetModel,
  updateUserModal,
  getUserByIdModel,
  getAllUsersModel,
} = require("../Models/usersModel");

async function signup(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const { userId } = await signUpModel(req.body);
    if (userId) {
      res.send({ firstName, lastName, email, phoneNumber });
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function login(req, res) {
  try {
    let { user, token } = req.body;
    // user = user.toObject();
    res.cookie("token", token, {
      maxAge: 15151252151251,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    const newUser = {...user};
    delete newUser.password;
    console.log("user pass", user.password);
    console.log("user", user);
    console.log("user", newUser);
    res.send(user);
  } catch (err) {
    console.log(err.message);
  }
}

async function verifyLogin(req, res) {
  try {
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    res.send({
      id: userId,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      email: user.email,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
    });
  } catch (err) {
    console.log(err.message);
  }
}

function logout(req, res) {
  try {
    if (req.cookies.token) {
      res.clearCookie("token");
      res.send({ ok: true });
    } else {
      console.log("inside else");
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function savePets(req, res) {
  try {
    console.log("savePets Controller");
    const { id, userId } = req.body;
    const doc = await savePetModel(id, userId);
    const { savedPets } = doc;
    res.status(200).send(savedPets);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function fosterPets(req, res) {
  try {
    console.log("fosterPets Controller");
    const { petId, userId } = req.body;
    const fosteredPet = await fosterPetModel(petId, userId);
    if (fosteredPet)
      res.status(200).send({ fosteredPet: fosteredPet, userId: userId });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function adoptPets(req, res) {
  try {
    console.log("adoptPets Controller");
    const { petId, userId } = req.body;
    const adoptedPet = await adoptPetModel(petId, userId);
    if (adoptedPet) res.status(200).send(adoptedPet);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function unsavePets(req, res) {
  try {
    console.log("unsavePets Controller");
    const { petId } = req.params;
    const { userId } = req.body;
    const deletedInfo = await unsavePetModel(petId, userId);
    if (deletedInfo.ok) res.status(200).send(deletedInfo.ok);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function returnPets(req, res) {
  try {
    console.log("returnPets Controller");
    const { petId, userId } = req.body;
    const returned = await returnPetModel(petId, userId);
    console.log("returned", returned);
    if (returned) res.status(200).send(returned);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getAllSavedPets(req, res) {
  try {
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    // console.log("all saved pets", user.savedPets);
    if (user) res.status(200).send(user.savedPets);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getAllOwnedPets(req, res) {
  try {
    const { userId } = req.body;
    const user = await getUserByIdModel(userId);
    // console.log("user.fostered", user.fostered);
    // console.log("user.adopted", user.adopted);
    // console.log("all owned pets", {
    //   fostered: user.fosteredPets || [],
    //   adopted: user.adoptedPets || [],
    // });
    if (user)
      res
        .status(200)
        .send({ fostered: user.fosteredPets, adopted: user.adoptedPets });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateUser(req, res) {
  try {
    // console.log("updateUser Controller");
    const { firstName, lastName, email, phoneNumber, bio, userId, password } =
      req.body;
    const updatedUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      bio,
      password,
    };
    // console.log("password hashed, ", password);
    const user = await updateUserModal(userId, updatedUser);
    if (user) res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getUser(req, res) {
  const { userId } = req.params;
  console.log("userId", userId);
  try {
    const user = await getUserByIdModel(userId);
    if (user) res.send(user);
    return;
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersModel();
    if (users) res.send(users);
    return;
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  signup,
  login,
  logout,
  savePets,
  fosterPets,
  unsavePets,
  adoptPets,
  returnPets,
  getAllSavedPets,
  getAllOwnedPets,
  updateUser,
  verifyLogin,
  getUser,
  getAllUsers,
};
