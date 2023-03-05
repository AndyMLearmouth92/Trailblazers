const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
 
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id });
      const user = await User.findById(req.params.id);
      console.log(req.user)
      res.render("profile.ejs", { posts: posts, user: user, loggedInUser: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  
  likePost: async (req, res) => {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/profile/${post.user}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await Post.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(post.cloudinaryId);
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      res.redirect(`/profile/${req.user.id}`);
    }
  },
};
