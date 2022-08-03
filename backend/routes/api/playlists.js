const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")

const router = express.Router();


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
