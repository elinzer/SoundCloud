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

//get album details from id
router.get('/:albumId', async (req, res) => {
    const albumId = req.params.albumId;

    const album = await Album.findByPk(albumId, {
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Song,
                attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'imageUrl', 'createdAt', 'updatedAt']
            }]
    })

    if (!album) {
        res.statusCode = 404;
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    } else {
        res.json(album)
    }

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
    const { title, description, url, imageUrl } = req.body;

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
            imageUrl: imageUrl,
            albumId: albumId
        })
        res.statusCode = 201;
        res.json(newSong)
    }

})

//create an album
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { title, description, imageUrl } = req.body;

    if (!title || title === '') {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "title": "Album title is required"
            }
        })
    } else {

        const newAlbum = await Album.create({
            userId: userId,
            title: title,
            description: description,
            imageUrl: imageUrl
        })
        res.statusCode = 201
        res.json(newAlbum)
    }

})


//edit an album
router.put('/:albumId', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const {title, description, imageUrl} = req.body;

    const albumToEdit = await Album.findByPk(req.params.albumId);

    if (!title || title === '') {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "title": "Album title is required"
            }
          })
    } else if (!albumToEdit) {
        res.statusCode = 404,
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
          })
    } else if (userId !== albumToEdit.userId) {
        res.statusCode = 403;
        res.json({
            "message": 'This is not your album to edit!',
            "statusCode": 403
        })
    } else {
        albumToEdit.set({
            title: title,
            description: description,
            imageUrl: imageUrl
        })

        await albumToEdit.save();

        res.json(albumToEdit)
    }



})


module.exports = router;
