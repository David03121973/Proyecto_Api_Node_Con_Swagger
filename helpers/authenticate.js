/* global process */
const jwt = require("jsonwebtoken");

const authenticate = () => {
    return function (req, res, next) {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ message: 'Necesita iniciar sesión' });
      }
      try {
        
        const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
      } catch (error) {
        return res.status(403).json({ message: 'Permiso denegado' });
      }
    };
  };

module.exports = authenticate;