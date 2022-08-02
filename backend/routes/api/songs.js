const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//get all songs by current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;

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
        include: [
            { model: User },
            {
                model: Album,
                attributes: ['id', 'title', 'imgUrl']
            }]
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

//edit a song
router.put('/:songId', requireAuth, async (req, res) => {
    const { userId, albumId, title, description, url, createdAt, updatedAt, imgUrl } = req.body;

    const user = req.user.id;

    const song = await Song.findByPk(req.params.songId);

    if (!song) {
        res.statusCode = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    } else if (!title || !url || title === '' || url === '') {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "title": "Song title is required",
                "url": "Audio is required"
            }
        })
    } else if (user !== song.userId) {
        res.statusCode = 403;
        res.json({
            "message": 'This is not your song to edit!',
            "statusCode": 403
        })
    } else if (user === song.userId) {
        song.set({
            title: title,
            description: description,
            url: url,
            imgUrl: imgUrl
        })
        await song.save();

        res.json(song)
    }

})

router.delete('/:songId', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;
    const id = req.params.songId

    const songToDelete = await Song.findOne({ where: { id: id } });

    if (!songToDelete) {
        res.statusCode = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    } else if (currentUserId !== songToDelete.userId) {
        res.statusCode = 403;
        res.json({
            "message": `This is not your song to delete!`,
            "statusCode": 403
        })
    } else {
        await songToDelete.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})





module.exports = router;
