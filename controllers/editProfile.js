const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
 
  // getProfileGrid: async (req, res) => {
  //   try {
  //     const posts = await Post.find({ user: req.user.id });
  //     // Go to post collection and find documents that have a userID property that matches the user ID. This profile only works for the logged in user. 
  //     res.render("profileGrid.ejs", { posts: posts, user: req.user });
  //    // Tells the view to render the posts that match the userID in the view - profile EJS.
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  geteditProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      // Go to post collection and find documents that have a userID property that matches the user ID. This profile only works for the logged in user. 
      res.render("editProfile.ejs", { posts: posts, user: req.user });
     // Tells the view to render the posts that match the userID in the view - profile EJS.
    } catch (err) {
      console.log(err);
    }
  },
 
  editProfile: async (req, res) => {
    try {
      // Upload image to cloudinary
      if(req.file != undefined){
      const result = await cloudinary.uploader.upload(req.file.path);
      }
      if(req.body.userName != ''){
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            userName: req.body.userName
          }
        )
        console.log('Successfully changed username')
      }
      if(req.body.location != ''){
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            location: req.body.location
          }
        )
        console.log('Successfully changed location')
      }
      if(req.body.bio != ''){
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            bio: req.body.bio
          }
        )
        console.log('Successfully changed bio')
      }
      // We need cloudinary to respond with the URL
      console.log(req.body)
      res.redirect("/editProfile");
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
      res.redirect(`/profileGrid`);
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
