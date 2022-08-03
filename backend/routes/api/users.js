// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")

const router = express.Router();

//checks that signup is valid
const validateSignup = [
  // check('email')
  //   .exists({ checkFalsy: true })
  //   .isEmail()
  //   .withMessage('Please provide a valid email.'),
  // check('username')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 4 })
  //   .withMessage('Please provide a username with at least 4 characters.'),
  // check('username')
  //   .not()
  //   .isEmail()
  //   .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username, token } = req.body;

  const existingUserName = await User.findOne({ where: { username: username } })

  const existingEmail = await User.findOne({ where: { email: email } })

  if (existingEmail) {
    res.statusCode = 403
    res.json(
      {
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      }
    )
  } else if (existingUserName) {
    res.statusCode = 403;
    res.json(
      {
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that username already exists"
        }
      }
    )
  } else if (email.includes('@') !== true || firstName === '' || lastName === '' || username === '' || email === '' || !firstName || !lastName) {
    res.statusCode = 400;
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    })
  } else {
    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      "id": user.id,
      "firstName": firstName,
      "lastName": lastName,
      "username": username,
      "email": email,
      "token": setTokenCookie(res, user)
    });
  }

}
);

//get albums of a user by user id
router.get('/:userId/albums', async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    res.statusCode = 404;
    res.json({
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  } else {

    const userAlbums = await Album.findAll({
      where: { userId: userId }
    })

    res.json({
      "Albums": userAlbums
    })

  }

})


//get songs of a user by user id
router.get('/:userId/songs', async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  if (user) {
    const userSongs = await user.getSongs();
    res.json({
      "Songs": userSongs
    })
  } else if (!user) {
    res.statusCode = 404;
    res.json({
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  }
})

//get all playlists by user id
router.get('/:userId/playlists', async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    res.statusCode = 404;
    res.json({
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  } else {

    const userPlaylists = await Playlist.findAll({
      where: { userId: userId }
    })

    res.json({
      "Playlists": userPlaylists
    })

  }

})



//get user/artist details from id
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    res.statusCode = 404;
    res.json({
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  } else {

    const userAlbums = await Album.count({ where: { userId: userId } });
    const userSongs = await Song.count({ where: { userId: userId } });

    res.json({
      "id": userId,
      "username": user.username,
      "totalSongs": userSongs,
      "totalAlbums": userAlbums
    })
  }

})



module.exports = router;
