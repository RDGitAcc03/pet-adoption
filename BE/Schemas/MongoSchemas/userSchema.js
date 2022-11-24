const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String, // String is shorthand for {type: String}
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    bio: {type: String, default: ""},
    isAdmin: {type: Boolean, default: false},
    savedPets: Array, 
    fosteredPets: Array,
    adoptedPets: Array
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
