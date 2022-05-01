const express = require("express");
const router = express.Router();
const ChallengeController = require("../controllers/ChallengeController");
const { authentication } = require("../middlewares/authentication");
const { uploadChallengeImages } = require("../middlewares/multer");
const { isAdmin } = require("../middlewares/role");

router.get("/", authentication, ChallengeController.getAll);
router.get("/:_id", authentication, ChallengeController.getById);
router.post("/", authentication, isAdmin, uploadChallengeImages.single('imageChallenge'), ChallengeController.create);

module.exports = router;