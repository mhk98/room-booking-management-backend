const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],  // Allowed values are "user" and "admin"
    default: "user",          // Default value is "user" if no value is provided
  },

});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to validate password
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to get hashed password
userSchema.statics.getHashPass = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
