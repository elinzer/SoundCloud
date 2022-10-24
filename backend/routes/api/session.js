// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Restore session user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "username": user.username
    });
  } else return res.json(null);
}
);


const validateLogin = [
  // check('credential')
  //   .exists({ checkFalsy: true })
  //   .notEmpty()
  //   .withMessage('Please provide a valid email or username.'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please provide a password.'),
  // handleValidationErrors
];


// Log in
router.post('/', async (req, res, next) => {
  const { credential, password } = req.body;


  const user = await User.login({ credential, password });

  if (credential === '' || password === '' || !credential || !password) {
    res.statusCode = 400;
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    })
  } else if (!user) {
    const err = new Error('Login failed');
    err.message = 'Invalid credentials'
    err.statusCode = 401;
    // err.title = 'Login failed';
    // err.errors = ['The provided credentials were invalid.'];
    res.statusCode = 401;
    res.json({
      "message": "Invalid credentials",
      "statusCode": 401
    });
  } else {
    const token = await setTokenCookie(res, user);

    return res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastname": user.lastName,
      "username": user.username,
      "email": user.email,
      "token": token
    });
  }

}
);

// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);







module.exports = router;
