import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from './../../config/config.js';

// Sign in controller
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    // ✅ Include role in JWT payload
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret
    );
    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' });
  }
};

// Sign out controller
const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: 'Signed out' });
};

// Middleware to require JWT signin
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth'
});

const hasAuthorization = (req, res, next) => {
  const sameUser =
    req.profile && req.auth && req.profile._id.toString() === req.auth._id;

  const isAdmin = req.auth && req.auth.role === 'admin';

  if (!sameUser && !isAdmin) {
    return res.status(403).json({ error: 'User is not authorized' });
  }

  next();
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
};
