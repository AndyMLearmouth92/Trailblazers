const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const editProfileController = require("../controllers/editProfile")

//Post Routes - simplified for now
router.get("/", ensureAuth, editProfileController.getEditProfile);
router.post("/editProfile", upload.single("file"), editProfileController.editProfile);

module.exports = router;
