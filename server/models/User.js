import mongoose from 'mongoose'
import md5 from 'md5'
import bcrypt from 'bcrypt'

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  likedImage: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post'
  }
});

// create default avatar and save it
User.pre('save', function (next) {
  this.avatar = `https://www.gravatar.com/avatar/${md5(this.username)}?d=identicon`;
  next();
})

// hashing password
User.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next();

      this.password = hash;
      next();
    })
  })
})



export default mongoose.model('User', User);