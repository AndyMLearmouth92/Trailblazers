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

router.put("/likePost/:id", postsController.likePost);
// Put request uses post ID and sends to the posts controller and the like post method.

module.exports = router;
