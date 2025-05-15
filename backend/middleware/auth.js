
//const secret = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {


  const authHeader = req.headers.authorization;



  
 const token = authHeader;
  //if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized Sorryyyy' });
  }
};