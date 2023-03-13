const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/getProfileSearch", ensureAuth, profileController.getProfileSearch);
router.get("/:userName", ensureAuth, profileController.getProfile);
router.put("/likePost/:id", profileController.likePost);
router.delete("/deletePost/:id", profileController.deletePost);

module.exports = router;
