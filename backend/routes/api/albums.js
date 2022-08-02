const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//get all albums by current user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const albums = await Album.findAll({ where: { userId: user } });

    res.json({
        "Albums": albums
    })
})


//get all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll();

    res.json({
        "Albums": albums
    })
})



//create a song
router.post('/:albumId/songs', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const albumId = req.params.albumId;
    const { title, description, url, imgUrl } = req.body;

    const album = await Album.findByPk(albumId);

    if (!title || !url || title === '' || url === '') {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "title": "Song title is required",
                "url": "Audio is required"
            }
        })
    } else if (!album) {
        res.statusCode = 404;
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    } else if (userId !== album.userId) {
        res.statusCode = 403;
        res.json({
            "message": "This is not your album to edit!",
            "statusCode": 403
        })
    } else {

        const newSong = await Song.create({
            userId: userId,
            title: title,
            description: description,
            url: url,
            imgUrl: imgUrl,
            albumId: albumId
        })

        res.json(newSong)
    }

})







module.exports = router;
