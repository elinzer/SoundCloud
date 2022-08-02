const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//get all songs by current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const {user} = req;

    if (user) {
        const userSongs = await Song.findAll({
            where: {
                userId: user.id
            }
        })

        res.json({
            "Songs": userSongs
        })
    }


})

//get song details from song id
router.get('/:songId', async (req, res) => {
    const songId = req.params.songId;

    const song = await Song.findByPk(songId, {
        include: [Album, User]
    })
    if (song) {
        res.json(song)
    } else if (!song) {
        res.statusCode = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
          })
    }
})




//get all songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll();

    res.json({
        "Songs": songs
    })
})












module.exports = router;
