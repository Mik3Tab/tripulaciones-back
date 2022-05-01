const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");

const { authentication } = require("../middlewares/authentication");
const { isAuthorComment } = require("../middlewares/isAuthor");
const { uploadCommentImages } = require("../middlewares/multer");

router.get("/:_id", authentication, CommentController.getComments)
router.post("/:_id", authentication, uploadCommentImages.single('imageComment'), CommentController.create);
router.put("/:_id", authentication, isAuthorComment, uploadCommentImages.single('imageComment'), CommentController.update);
router.put('/like/:_id',authentication, CommentController.like)
router.put('/dislike/:_id',authentication, CommentController.dislike)
router.delete("/:_id", authentication, isAuthorComment, CommentController.delete);

module.exports = router;