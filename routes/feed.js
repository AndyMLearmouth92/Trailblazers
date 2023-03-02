const express = require("express");
// Using express
const router = express.Router();
// Sets up the router
const authController = require("../controllers/auth");
// Sets up authentication
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const feedsController = require("../controllers/feed");
// For passprt.JS
router.get("/", ensureAuth, feedsController.getFeed);
router.get("/profile/:id", ensureAuth, feedsController.getProfile);
router.put("/likePost/:id", feedsController.likePost);
router.delete("/deletePost/:id", feedsController.deletePost);
// Put request uses post ID and sends to the posts controller and the like post method.

module.exports = router;
