const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
 
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id });
      const user = await User.findById(req.params.id);
      res.render("profile.ejs", { posts: posts, user: user, loggedInUser: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  
  getProfileSearch: async (req, res) => {
    try {
      const user = await User.findById({ userName: req.params.userName.toLowerCase() }).lean();
      console.log(req.user.userName)
      console.log(req.query)
      res.render(`/profile/${req.user.id}`)
      //res.render(`${req.query.user.toLowerCase()}`, {userName: req.params.userName, loggedInUser: req.user});
    } catch (err) {
      //res.render(`${req.user.username}`);
      res.render(`/profile/${req.user.id}`)
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
