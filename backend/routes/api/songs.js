const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');

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

//get comments by song id
router.get('/:songId/comments', async (req, res) => {
    const songId = req.params.songId;

    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    } else {
        const comments = await Comment.findAll({
            include: [{ model: User, attributes: ['id', 'username'] }],
            where: {
                songId: songId
            }
        })

        res.json({
            "Comments": comments
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
                attributes: ['id', 'title', 'imageUrl']
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

    let { page, size } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page)) page = 1;
    if (Number.isNaN(size)) size = 20;


    let pagination = {};
    if (page > 10 || size > 20 || page <= 0 || size <= 0) {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "page": "Page must be greater than or equal to 1 and less than or equal to 10",
              "size": "Size must be greater than or equal to 1 and less than or equal to 20",
              "createdAt": "CreatedAt is invalid"
            }
          })
    } else if (page >= 1 && size >= 1 && page <= 10 && size <= 20) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);

        const songs = await Song.findAll({ ...pagination });

        res.json({
            "Songs": songs,
            page,
            size
        })
    }

})

//edit a song
router.put('/:songId', requireAuth, async (req, res) => {
    const { userId, albumId, title, description, url, createdAt, updatedAt, imageUrl } = req.body;

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
            imageUrl: imageUrl
        })
        await song.save();

        res.json(song)
    }

})

//create a comment for song based on song id
router.post('/:songId/comments', requireAuth, async (req, res) => {
    const songId = req.params.songId;
    const userId = req.user.id;

    const { body } = req.body;

    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    } else if (!body || body === '') {
        res.statusCode = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "body": "Comment body text is required"
            }
        })
    } else {
        const newComment = await Comment.create({
            userId: userId,
            songId: song.id,
            body: body
        })

        res.json(newComment)
    }

})


//create a song
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    // const albumId = req.params.albumId;
    const { albumId, title, description, url, imageUrl } = req.body;

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
    } else if (album === undefined) {
        res.statusCode = 404;
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    } else if (album && userId !== album.userId) {
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


//delete song
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
