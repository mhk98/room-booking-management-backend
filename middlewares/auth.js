const jwt = require("jsonwebtoken");

const auth =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      // Get authorization token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          status: "fail",
          error: "You are not authorized",
        });
      }

      // Verify token
      const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verifiedUser; // Add user info to request object

      // Implement guard using role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        return res.status(403).json({
          status: "fail",
          error: "Forbidden",
        });
      }
      
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          status: "fail",
          error: "Invalid token",
        });
      }
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  };

module.exports = auth;
