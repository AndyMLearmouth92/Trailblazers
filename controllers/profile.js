const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
 
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id });
      const users = await User.findById(req.params.id);
      res.render("profile.ejs", { posts: posts, user: users });
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
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id and make sure it exists.
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db 
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
