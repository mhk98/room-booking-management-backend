const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String], // Array of strings
   required: true
  },
  picture: {
    type: String,
    default: null, // or use `required: true` if it's mandatory
  },
});

// Create the model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
