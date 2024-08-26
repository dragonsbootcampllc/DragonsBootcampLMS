/**
 * @constructor
 * @param {Array} roles - Array of roles to be compared
 * @returns {Function} - Middleware function
 * @description - Middleware function to verify the role of the user
 * @requires - it require the protect middleware to function properly
 */

const verifyRole = (roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

module.exports = verifyRole;
