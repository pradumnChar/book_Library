const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//I HAVE USED POSTMAN TO FIRST CHECK ALL API ,  ENDPOINSTSS, HENCE HAVE ADDED STATUS CODE TO KNOW ERRORRSs
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password){
      return res.status(400).json({ message: 'All Required' });
    }

    const okUser = await User.findOne({ username });
    
    if (okUser) return res.status(409).json({ message: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);






    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered.....' });
  } catch (err) {
    res.status(500).json({ message: 'ServerSide error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: 'Invalid Data' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid Data' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: 'ServerSide error' });
  }
};