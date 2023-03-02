const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
 
  getEditProfile: async (req, res) => {
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
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          profilePhoto: result.secure_url,
          cloudinaryId: result.public_id
        }
      )
      console.log('Successfully changed username')
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
};
