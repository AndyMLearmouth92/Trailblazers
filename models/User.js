const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { stringify } = require("postcss");


const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true },
  password: String,
  profilePhoto: {type: String, default: 'https://res.cloudinary.com/dhgjf8v01/image/upload/v1676644661/mountain-425134_sbqobs.jpg'},
  cloudinaryId: {type: String, default: 'mountain-425134_sbqobs'},
  location: {type: String, default: 'The world'},
  bio: {type: String, default: 'Enjoy hiking',},
});

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
