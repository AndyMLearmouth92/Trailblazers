const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).populate('user').lean();
      res.render("feed.ejs", { posts: posts, user: req.user, loggedInUser: req.user });
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
      console.log("Likes +1");
      res.redirect(`/feed`);
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
    res.redirect("/feed");
  } catch (err) {
    res.redirect("/feed");
  }
},
};
