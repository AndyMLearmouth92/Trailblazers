const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/profileSearch", ensureAuth, profileController.profileSearch);
router.get("/getEditProfile", ensureAuth, profileController.getEditProfile);
router.get("/:userName", ensureAuth, profileController.getProfile);
router.put("/likePost/:id", profileController.likePost);
router.delete("/deletePost/:id", profileController.deletePost);
router.post("/editProfile", upload.single("file"), profileController.editProfile);

module.exports = router;
