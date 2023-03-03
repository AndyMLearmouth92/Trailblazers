const express = require("express");
// Using express
const router = express.Router();
// Sets up the router
const authController = require("../controllers/auth");
// Sets up authentication
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
// For passprt.JS


router.get("/", homeController.getIndex);
//Cannot use profile route as throws and error on the image
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
