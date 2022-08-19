// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const commentsRouter = require('./comments.js');
const playlistRouter = require('./playlists.js');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
//keep this above other middleware/routes
router.use(restoreUser)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/artists', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/comments', commentsRouter);

router.use('/playlists', playlistRouter);

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

module.exports = router;
