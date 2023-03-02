const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {

  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id });
      const users = await User.findById(req.params.id);
      res.render("profile.ejs", { posts: posts, user: users });
     // Tells the view to render the posts that match the userID in the view - profile EJS.
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).populate('user').lean();
      console.log(posts)
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
