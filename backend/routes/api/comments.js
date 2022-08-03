const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//edit a comment
router.put('/:commentId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const commentId = req.params.commentId;
    const { body } = req.body;

    const commentToEdit = await Comment.findByPk(commentId);

    if (!commentToEdit) {
        res.statusCode = 404;
        res.json({
            "message": "Comment couldn't be found",
            "statusCode": 404
          })
    } else if (!body) {
        res.statusCode = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "body": "Comment body text is required",
            }
          })
    } else if (userId !== commentToEdit.userId) {
        res.statusCode = 403;
        res.json({
            "message": "This is not your comment to edit!",
            "statusCode": 403
        })
    } else {
        commentToEdit.set({
            body: body
        })
        await commentToEdit.save();

        res.json(commentToEdit)
    }

})

//delete comment
router.delete('/:commentId', requireAuth, async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    const commentToDelete = await Comment.findByPk(commentId);

    if (!commentToDelete) {
        res.statusCode = 404;
        res.json({
            "message": "Comment couldn't be found",
            "statusCode": 404
          })
    } else if (userId !== commentToDelete.userId) {
        res.statusCode = 403;
        res.json({
            "message": "This is not your comment to delete",
            "statusCode": 403
        })
    } else {
        await commentToDelete.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }


})









module.exports = router;
