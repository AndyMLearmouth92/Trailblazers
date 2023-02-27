const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const users = await User.find({ _id: req.user.id });
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
 
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      // Finding the post by the post ID which comes from the get request route.
      res.render("post.ejs", { post: post, user: req.user, comment: comment, });
      // Sends the information to the post.ejs view which will render it. Req.user is the current session and relates to cookies stored in the database.
    } catch (err) {
      console.log(err);
    }
  },
  
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      // Speaks to the model and finds document where the ID matches the one in the request and increases likes by 1. Console logs this and redirects to the specific post using the ID.
      console.log("Likes +1");
      res.redirect(`/feed`);
    } catch (err) {
      console.log(err);
    }
  },
};
