const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();





//get all songs
router.get('/', async (req, res, next) => {
    const songs = await Song.findAll();

    res.json({
        "Songs": songs
    })
})












module.exports = router;
