const mongoose = require("mongoose");
const { Schema } = mongoose;


const appOperationsSchema = new Schema(
  {
    isRandomized: { type: Boolean, default: false }, // String is shorthand for {type: String}
    petsOfTheWeek: { type: Array, default: [] },
    lastRandomPet: { type: Object, default: {} }
  },
  { collection: "appOperations" }
);

const AppOperations = mongoose.model("AppOperations", appOperationsSchema);
module.exports = AppOperations;
