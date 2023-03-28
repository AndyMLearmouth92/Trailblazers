const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
 
  getProfile: async (req, res) => {
    try {
      const user = await User.findOne({userName : req.params.userName}).lean();
      const posts = await Post.find({ user: user._id }).sort({ createdAt: "desc" }).populate('user').lean();
      res.render("profile.ejs", { posts: posts, user: user, loggedInUser: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  
  profileSearch: async (req, res) => {
    try {
      const user = await User.findOne({ userName: req.query.userName}).lean();
      const posts = await Post.find({ user: user._id }).populate('user').lean();
      res.render("profile.ejs", { posts: posts, user: user, loggedInUser: req.user});
    } catch (err) {
      res.redirect(`/`)
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
      const user = await User.findById(post.user)
      console.log("Likes +1");
      res.redirect(`/profile/${user.userName}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(post.cloudinaryId);
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/profile/${req.user.userName}`);
    } catch (err) {
      res.redirect(`/profile/${req.user.userName}`);
    }
  },
  
  getEditProfile: async (req, res) => {
    try {
      res.render("editProfile.ejs", { loggedInUser: req.user });
    } catch (err) {
      console.log(err);
    }
  },
 
  editProfile: async (req, res) => {
    try {
      let userName = req.user.userName
      if(req.file != undefined){
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          profilePhoto: result.secure_url,
          cloudinaryId: result.public_id
        }
      )
      console.log('Successfully changed image')
      }
      if(req.body.userName != ''){
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            userName: req.body.userName
          }
        )
        console.log('Successfully changed username')
        userName = req.body.userName
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
      res.redirect(`/profile/${userName}`);
    } catch (err) {
      console.log(err);
    }
  },
};


