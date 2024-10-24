const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (userInfo) => {
  try {
    const payload = {
      email: userInfo.email,
      role: userInfo.role,
    };

    // Token generation
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '1h', // or '3600s' for 1 hour
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};