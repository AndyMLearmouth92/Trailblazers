const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const feedsController = require("../controllers/feed");

router.get("/", ensureAuth, feedsController.getFeed);
router.put("/likePost/:id", feedsController.likePost);
router.delete("/deletePost/:id", feedsController.deletePost);

module.exports = router;
