import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdDate: {
    required: true,
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
    default: 0,
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