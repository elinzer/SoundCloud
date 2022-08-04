const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, PlaylistSong } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")

const router = express.Router();

//get playlists of current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const playlists = await Playlist.findAll({
        where: {
            userId: userId
        }
    })
    res.json({
        "Playlists": playlists
    })
})


//get playlist deets w/id
router.get('/:playlistId', async (req, res) => {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findByPk(playlistId, {
        include: {
            model: Song,
            through: {
                attributes: []
            },
            attributes: ['id', 'userId', "albumId", "title", "url", "imageUrl", "createdAt", "updatedAt"]
        }
    });


    if (!playlist) {
        res.statusCode = 404;
        res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        })
    } else {

        res.json(playlist)
    }
})


//add a song to a playlist by playlist id
router.post('/:playlistId/songs', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const playlistId = req.params.playlistId;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist) {
        res.statusCode = 404;
        res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        })

    } else if (!song) {
        res.statusCode = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    } else if (userId !== playlist.userId) {
        res.statusCode = 403;
        res.json({
            "message": "This is not your playlist to edit!",
            "statusCode": 403
        })
    } else {
        const newPlaylistSong = await PlaylistSong.create({
            playlistId: playlistId,
            songId: songId
        })

        res.json({
            "id": newPlaylistSong.id,
            "playlistId": newPlaylistSong.playlistId,
            "songId": newPlaylistSong.songId
        })
    }


})



//create a playlist
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const { name, imageUrl } = req.body;

    if (!name || name === '') {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "name": "Playlist name is required"
            }
        })
    } else {
        const newPlaylist = await Playlist.create({
            userId: userId,
            name: name,
            imageUrl: imageUrl
        })

        res.statusCode = 201;
        res.json(newPlaylist)
    }

})

//edit a playlist
router.put('/:playlistId', requireAuth, async (req, res) => {
    const playlistId = req.params.playlistId;
    const userId = req.user.id;
    const { name, imageUrl } = req.body;

    const playlistToEdit = await Playlist.findByPk(playlistId);

    if (!name || name === '') {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "name": "Playlist name is required"
            }
          })
    } else if (!playlistToEdit) {
        res.statusCode = 404;
        res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
          })
    } else if (userId !== playlistToEdit.userId) {
        res.statusCode = 403;
        res.json({
            "message": "This is not your playlist to edit!",
            "statusCode": 403
        })
    } else {
        playlistToEdit.set({
            name: name,
            imageUrl: imageUrl
        })
        await playlistToEdit.save();
        res.json(playlistToEdit)
    }

})


//delete a playlist
router.delete('/:playlistId', requireAuth, async (req, res) => {
    const playlistId = req.params.playlistId;
    const userId = req.user.id;

    const playlistToDelete = await Playlist.findByPk(playlistId);

    if (!playlistToDelete) {
        res.statusCode = 404;
        res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
          })
    } else if (userId !== playlistToDelete.userId) {
        res.statusCode = 403;
        res.json({
            "message": "This is not your playlist to delete!",
            "statusCode": 403
        })
    } else {
        await playlistToDelete.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }

})






module.exports = router;
