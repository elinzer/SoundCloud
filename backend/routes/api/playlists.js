const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, PlaylistSong } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")

const router = express.Router();


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









module.exports = router;
