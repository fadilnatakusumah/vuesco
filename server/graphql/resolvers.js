const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = ({ username, password }, expiresIn) => {
  const secret = process.env.SECRET;
  return jwt.sign({ username, password }, secret, { expiresIn })
}

export default {
  // =============Query=============
  // User Query
  getCurrentUser: async (args, { User, CurrentUser }) => {
    if (!CurrentUser) return null;

    const { username } = CurrentUser;
    const user = await User.findOne({ username })
      .populate({
        path: 'likedImage',
        model: 'Post'
      });

    if (!user) {
      throw new Error("User is not found")
    }

    return user;
  },

  // Post Query
  getPosts: async (_, { Post }) => {
    // if (user_id) {
    //   const Posts = await Post.find({
    //     createdBy: user_id
    //   })
    //     .sort({
    //       createdDate: 'desc'
    //     });

    //   return Posts
    // }

    const Posts = await Post.find({})
      .sort({ createdDate: 'desc' })
      .populate({
        path: 'createdBy',
        model: 'User'
      });

    return Posts
  },

  getMyPosts: async ({ user_id }, { Post }) => {
    console.log("TCL: user_id", user_id)
    const Posts = await Post.find({
      createdBy: user_id
    })
      .sort({ createdDate: 'desc' })
      .populate({
        path: 'createdBy',
        model: 'User'
      });

    return Posts
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

  signinUser: async ({ username, password }, { User }) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User doesn't exist")
    }

    const isSamePassword = await bcrypt.compare(password, user.password)
    if (isSamePassword) {
      const token = createToken({ username, password }, '1hr');
      return { token }
    } else {
      throw new Error("Invalid password")
    }
  },


  // Post Mutation
  createPost: async ({ caption, imageUrl, createdBy }, { Post }) => {
    const post = await new Post({
      caption, imageUrl, createdBy
    })
      .save();

    const getPost = await Post.findOne({
      _id: post._id
    })
      .populate({
        path: 'createdBy',
        model: 'User'
      })

    if (!getPost) {
      throw new Error("Failed to create new Post")
    }

    return getPost
  },

  deletePost: async ({ id_post }, { Post }) => {
    const findPost = await Post.findOne({ _id: id_post }).populate({
      path: 'createdBy',
      model: 'User'
    });
    const tempPost = { ...findPost }
    findPost.delete();
    // const post = await Post.deleteOne({_id: id_post});

    // const getPost = await Post.findOne({
    //   _id: post._id
    // })
    //   .populate({
    //     path: 'createdBy',
    //     model: 'User'
    //   })

    if (!tempPost) {
      throw new Error("Failed to delete Post")
    }

    return tempPost
  }
}