const mongoose = require("mongoose");
const { Schema } = mongoose;

const petSchema = new Schema(
  {
    type: String, // String is shorthand for {type: String}
    adoptionStatus: String,
    color: String,
    hypoallergenic: {type: Boolean, default: false},
    dietaryRestrictions: String,
    name: {type: String, required: true},
    breedOfAnimal: String,
    height: {type: Number, default: 0},
    weight: {type: Number, default: 0},
    bio: String,
    imageUrl: {type: String, required: true},
  },
  { collection: "pets" }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
