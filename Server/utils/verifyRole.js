const jwt = require('jsonwebtoken');

const verifyRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access.' });
      }

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied.' });
      }

      req.user = decoded;
      next();
    });
  };
};

module.exports = verifyRole;
