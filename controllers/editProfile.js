const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
 
  getEditProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); 
      res.render("editProfile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
 
  editProfile: async (req, res) => {
    try {
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
      res.redirect("/editProfile");
    } catch (err) {
      console.log(err);
    }
  },
};
