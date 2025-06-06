const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé :", decoded); 
    req.user = decoded; // contient id et role
    next();
  } catch (err) {
    const msg =
    err.name === 'TokenExpiredError'
      ? 'Token expiré'
      : 'Token invalide';
  res.status(403).json({ message: msg });
  }
};

module.exports = verifyToken;
