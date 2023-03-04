const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {

//Should this go through profile controller
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, loggedInUser: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({post: req.params.id}).sort({ createdAt: "asc" }).populate('user').lean();
      res.render("post.ejs", { post: post, user: req.user, comment: comment, loggedInUser: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getPostPage: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("createPost.ejs", { posts: post, user: req.user, comment: comment, loggedInUser: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        location: req.body.location,
        trailName: req.body.trailName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        rating: req.body.rating,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
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
      res.redirect(`/post/${req.params.id}`);
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
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
