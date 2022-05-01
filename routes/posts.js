const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

const { authentication } = require("../middlewares/authentication");
const { isAuthorPost } = require("../middlewares/isAuthor");
const { uploadPostImages } = require("../middlewares/multer");

router.post(
  "/",
  authentication, 
  uploadPostImages.single("imagePost"),
  PostController.create
);
router.get("/", authentication, PostController.getAll);
router.get("/id/:_id", authentication, PostController.getById);
router.get(
  "/description/:description",
  authentication,
  PostController.getByDescription
); 
router.put( 
  "/:_id",
  authentication,
  isAuthorPost,
  uploadPostImages.single("imagePost"),
  PostController.update
);
router.put("/like/:_id", authentication, PostController.like);
router.put("/dislike/:_id", authentication, PostController.dislike);
router.delete("/:_id", authentication, isAuthorPost, PostController.delete);

module.exports = router;
