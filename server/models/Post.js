import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  caption: {
    type: String,
    required: true, unique: false,
  },
  imageUrl: {
    type: String, unique: false,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: [String],
  },
  comments: [{
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    commentBody: {
      type: String,
      required: true,
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
  }],
})

export default mongoose.model('Post', Post);