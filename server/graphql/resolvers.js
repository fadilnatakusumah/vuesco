const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const createToken = ({ username, password }, expiresIn) => {
  const secret = process.env.SECRET;
  return jwt.sign({ username, password }, secret, { expiresIn })
}

export default {
  // =============Query=============
  getCurrentUser: async (args, { User, CurrentUser }) => {
    if (!CurrentUser) return null;

    const { username } = CurrentUser;
    const user = await User.findOne({ username })
      .populate({
        path: 'likedImage',
        model: 'Post'
      });
    console.log("TCL: user", user)

    if (!user) {
      throw new Error("User is not found")
    }

    return user;
  },

  // =============Mutation=============

  // User Mutation
  signupUser: async ({ username, email, password }, { User }) => {
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      throw new Error("User already exist")
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      throw new Error("Email already used")
    }

    await new User({
      username, email, password
    }).save();

    const token = createToken({ username, password }, '1hr');
    return { token }
  },
}